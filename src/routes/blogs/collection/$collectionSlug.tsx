import { createFileRoute } from "@tanstack/react-router";
import Blogpage from "..";

export const Route = createFileRoute("/blogs/collection/$collectionSlug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { collectionSlug } = Route.useParams();
  return <Blogpage collection={collectionSlug} />;
}
