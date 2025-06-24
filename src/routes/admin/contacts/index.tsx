/* eslint-disable react-hooks/exhaustive-deps */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useDebounce } from "@/hooks/use-debounce";
import { API_URL } from "@/config";
import { STORAGE_KEY } from "@/auth";
import { LoadingTable } from "@/components/loading/table-loading";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export const Route = createFileRoute("/admin/contacts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ContactPage />;
}

export interface IContact {
  _id: string;
  email: string;
  name?: string;
  issueType?: string;
  message?: string;
  createdAt: string;
}

function ContactPage() {
  const [contacts, setContact] = useState<IContact[]>([]);
  const [selectedContacts, setSelectedcontacts] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    fetchContacts();
  }, [debouncedSearch, page]);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(
        `${API_URL}/contacts?page=${page}&limit=10&search=${debouncedSearch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch contacts");

      const data = await res.json();
      setContact(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(`${API_URL}/contacts/delete-many`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedContacts }),
      });

      if (!res.ok) throw new Error("Failed to delete contacts");

      setSelectedcontacts([]);
      setPage(1);
      fetchContacts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const allSelected = useMemo(
    () => selectedContacts.length === contacts.length && contacts.length > 0,
    [selectedContacts, contacts]
  );

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "App", href: "/admin" },
          { label: "Danh sách", isCurrent: true },
        ]}
      />
      <div className="p-6 relative space-y-4">
        {loading && <LoadingTable />}
        <div className="flex h-10 py-3 justify-between space-x-1 items-center">
          <Input
            className="max-w-xs"
            placeholder="Tìm tiêu đề bài viết"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="flex space-x-2">
            <Button
              variant={selectedContacts.length ? "destructive" : "outline"}
              size="icon"
              onClick={handleDelete}
              disabled={!selectedContacts.length}
            >
              <TrashIcon strokeWidth={1.25} />
            </Button>
            <Link to="/admin/contacts/create">
              <Button size="icon">
                <PlusIcon />
              </Button>
            </Link>
          </span>
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <Table className="overflow-x-auto max-h-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) =>
                    setSelectedcontacts(
                      checked ? contacts.map((b) => b._id) : []
                    )
                  }
                />
              </TableHead>
              <TableHead className="max-w-sm">Email</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Lý do</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedContacts.includes(contact._id)}
                    onCheckedChange={(checked) =>
                      setSelectedcontacts((prev) =>
                        checked
                          ? [...prev, contact._id]
                          : prev.filter((id) => id !== contact._id)
                      )
                    }
                  />
                </TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.issueType}</TableCell>

                <TableCell>
                  {new Date(contact.createdAt).toLocaleString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </TableCell>
                <TableCell className="truncate">{contact.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
