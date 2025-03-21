import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

// ----------------------------------------------------------------------

export const Logo2 = () => {
  return (
    <a href={"/"}>
      {" "}
      <img
        className="dark:invert w-28 h-14 object-contain"
        src="/logo.png"
        alt={""}
      />
    </a>
  );
};

export const Logo = () => {
  return (
    <span className="w-24 h-12 justify-center flex items-center">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width="100%"
        viewBox="0 0 600 198"
        enableBackground="new 0 0 600 198"
        xmlSpace="preserve"
      >
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M346.638275,89.938667   C352.223541,94.123573 352.883728,100.058250 351.822876,106.195572   C349.674744,118.623413 350.447998,131.023422 355.308929,142.364258   C359.114716,151.243362 364.227936,159.596802 372.748932,165.943649   C378.379333,170.137436 384.416870,172.219635 390.315369,175.256424   C404.145752,182.376740 418.545868,180.381927 432.839966,178.780426   C438.172119,178.183014 443.297638,175.315704 448.399689,173.199707   C454.650238,170.607376 461.421967,168.612183 466.800262,164.737457   C474.081940,159.491425 481.546204,153.607040 486.599365,146.368134   C494.208374,135.467819 500.949829,123.596283 501.001831,109.455276   C501.018677,104.876068 504.686768,98.986778 508.101715,98.032700   C512.995178,96.665573 516.044128,99.089531 520.230774,103.831512   C524.411987,108.567345 521.523010,113.115562 520.633240,116.904335   C518.278198,126.932877 514.983032,136.892807 510.708801,146.262741   C508.047333,152.097061 503.124481,156.979126 498.850861,161.975769   C494.813629,166.696014 490.717712,171.539017 485.880249,175.355316   C480.595459,179.524551 474.332703,182.429718 468.672668,186.153992   C461.667145,190.763672 453.936493,193.667236 446.122375,196.449127   C444.497406,197.027634 442.923004,197.748260 441.662659,198.701691   C425.312439,199.000000 408.624878,199.000000 391.468658,199.000000   C389.759552,198.021088 388.664551,196.655930 387.255310,196.125259   C377.237946,192.352951 367.280365,188.685257 359.687836,180.476120   C355.782867,176.253983 350.014832,173.457047 346.985626,168.785934   C341.010223,159.571915 334.400940,150.394363 333.945007,138.590363   C333.551514,128.402145 332.174805,118.232315 332.186554,108.055466   C332.193512,102.047699 332.170349,95.419586 337.634094,90.880196   C338.108795,90.485786 338.750488,90.292282 339.644775,90.008163   C339.974945,90.010857 339.911835,89.937881 340.089325,90.316589   C341.966949,90.727180 343.667114,90.759071 345.436035,90.495560   C345.882629,90.112999 346.260468,90.025833 346.638275,89.938667  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M1.000000,63.468658   C1.999039,59.722073 3.335541,56.502995 3.919797,53.152733   C4.848194,47.829090 4.420239,42.131996 6.101917,37.106865   C9.048893,28.300823 13.062068,19.883747 20.682335,13.771818   C31.566628,5.041934 43.607407,1.909421 57.404819,4.681987   C67.719170,6.754637 74.062843,12.869350 78.629539,22.001404   C83.357010,31.454964 82.736542,40.526436 79.304161,50.119762   C77.841614,54.207485 78.113914,58.890331 77.352509,63.259983   C75.897240,71.611755 74.266228,79.932907 72.661713,88.515198   C73.832954,88.916519 75.727646,89.166435 77.124176,90.134796   C79.403030,91.714943 81.974312,93.175720 79.329079,96.977402   C77.748871,99.248444 77.717384,102.589233 76.956757,105.440369   C75.964188,109.160889 72.503098,111.380234 68.827034,110.336700   C64.028221,108.974449 59.363003,107.119003 54.533257,105.899826   C52.692917,105.435257 50.120968,105.469818 48.627247,106.432533   C40.740265,111.515747 26.848656,111.492516 19.028986,106.073532   C15.691760,103.760849 11.925310,101.953484 8.962422,99.249664   C6.450360,96.957245 4.814051,93.705162 2.697647,90.748421   C2.676841,90.758179 2.014004,91.068954 1.175583,91.689865   C1.000000,82.645767 1.000000,73.291542 1.000000,63.468658  M40.165722,68.864037   C46.850475,66.891830 47.703030,67.366615 50.117062,73.367752   C50.651188,74.695549 52.135643,75.641060 53.182514,76.762604   C54.159500,75.482323 55.772938,74.309349 56.009830,72.904282   C57.509689,64.008270 58.858360,55.079342 59.934555,46.122540   C60.457516,41.770100 61.097912,37.164459 60.227776,32.976223   C59.002350,27.077858 53.549114,24.988951 48.294334,24.164055   C41.799381,23.144470 36.101757,26.072815 31.093916,29.914070   C25.836351,33.946877 27.201159,40.407917 26.069031,45.887840   C25.039986,50.868805 24.648912,55.978081 23.829727,61.006866   C22.980179,66.222038 21.449152,71.378754 21.141064,76.615456   C20.802574,82.368919 26.484612,87.136101 31.918890,86.249840   C31.292906,82.409874 29.898615,78.499191 30.228970,74.740067   C30.668636,69.737061 34.596188,68.296097 40.165722,68.864037  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M601.000000,26.531376   C600.005310,29.780916 598.530029,32.491814 598.112610,35.356842   C597.140442,42.029621 596.915588,48.810631 595.960510,55.486633   C593.744080,70.978905 591.443542,86.463379 588.848816,101.895821   C587.101013,112.290977 578.255432,115.230606 569.998474,108.669342   C568.870544,107.773041 566.314880,107.482704 565.052917,108.135338   C555.420593,113.116623 545.969238,112.777763 536.371887,108.114441   C529.978149,105.007736 525.901184,99.371902 521.513733,94.278099   C515.912109,87.774628 517.133240,70.949341 522.854004,64.071144   C523.679504,63.078625 524.369751,61.832874 524.700256,60.591835   C527.214661,51.150219 535.439209,46.851231 542.619263,42.515270   C551.071167,37.411255 561.109253,37.220245 570.808044,39.470028   C574.954285,40.431805 576.627563,39.992260 577.194580,35.121834   C578.161560,26.815214 579.990295,18.579025 581.956909,10.433939   C582.702332,7.346197 584.831055,4.592431 586.164673,1.343229   C590.024536,1.000000 594.049072,1.000000 598.206909,1.301256   C599.226868,2.401670 600.113464,3.200826 601.000000,3.999992   C601.000000,11.354252 601.000000,18.708504 601.000000,26.531376  M541.113037,71.862999   C540.873962,73.317612 540.163574,74.887733 540.486267,76.204681   C541.372009,79.818878 541.665344,84.495079 544.073425,86.610527   C547.957397,90.022530 553.331421,90.472527 558.854370,89.079666   C563.363892,87.942375 565.689697,84.736397 568.790405,81.965195   C573.847595,77.445366 572.624634,71.639908 571.466003,66.866722   C570.435791,62.622711 566.209473,59.369129 561.298340,57.994808   C554.018127,55.957512 542.440063,65.079010 541.113037,71.862999  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M601.000000,3.499990   C600.113464,3.200826 599.226868,2.401670 598.670166,1.301254   C599.666687,1.666663 600.333313,2.333329 601.000000,3.499990  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M347.045197,89.971909   C346.260468,90.025833 345.882629,90.112999 345.435364,90.533875   C345.365906,90.867577 345.402466,90.939690 345.254517,90.450493   C345.004791,89.636131 344.903015,89.310966 344.652557,88.680679   C343.069183,88.565033 341.634521,88.754509 340.189606,89.011314   C340.179382,89.078644 340.044159,89.095016 340.044159,89.095016   C338.234406,88.803329 336.424622,88.511635 334.517456,88.204247   C335.426361,81.546555 336.387817,74.503876 337.349274,67.461197   C336.907043,67.218430 336.464813,66.975670 336.022583,66.732903   C334.654419,67.681557 333.036316,68.409302 331.965424,69.620720   C328.878937,73.112167 326.070648,76.847687 323.046600,80.396584   C319.052429,85.083954 313.539612,86.853912 307.890656,85.765282   C303.177032,84.856888 299.069946,82.079262 297.608948,76.532745   C296.940460,73.995026 294.786804,71.855080 293.340240,69.514015   C291.768921,66.971077 290.236542,64.404045 288.319305,61.240532   C286.835388,73.593140 285.243195,85.382614 284.074097,97.213905   C283.513641,102.885956 279.531189,108.484016 274.092560,109.887474   C269.902496,110.968742 261.669220,103.659271 262.388123,99.248207   C264.612457,85.599472 267.148560,72.000618 269.285126,58.338848   C270.478027,50.711109 271.098907,42.994652 272.013153,35.322418   C273.162262,25.679214 284.286102,19.385927 291.975037,24.028490   C292.812103,24.533913 293.783417,25.093145 294.252899,25.887297   C297.883148,32.027962 301.519287,38.170654 304.923157,44.437870   C307.468719,49.124737 309.664612,54.001186 312.029144,58.786804   C313.868164,62.508831 315.757477,61.023277 317.567627,58.781250   C322.865540,52.219376 328.113068,45.616726 333.424652,39.066013   C336.793121,34.911686 340.283142,30.855745 343.641357,26.693331   C347.282471,22.180202 352.252502,20.817577 357.116028,23.125069   C360.766479,24.857027 362.920044,30.849569 362.204407,35.830368   C360.988647,44.292271 360.335571,52.837845 359.019470,61.281773   C357.496674,71.051796 355.512878,80.749962 353.672699,90.787811   C351.530090,90.518234 349.491089,90.261696 347.045197,89.971909  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M363.032349,73.437714   C364.441620,59.299271 374.178894,50.821762 382.986816,41.984043   C385.129669,39.833904 389.322601,39.648037 392.623871,38.745514   C404.251312,35.566742 415.468506,36.259521 425.791901,42.977989   C434.671570,48.756870 439.543121,62.627522 437.573364,73.110077   C435.315857,85.123970 429.198578,95.199944 419.892273,101.971390   C411.825562,107.840889 402.695129,112.541656 390.861267,110.580070   C380.119720,108.799553 372.303650,104.139656 366.635315,95.898209   C362.243042,89.512115 362.665863,81.499512 363.032349,73.437714  M401.934357,79.825798   C402.928314,83.141464 403.905640,86.472054 408.416138,86.792351   C414.372253,82.866867 415.371552,76.205605 415.729370,69.984741   C416.031097,64.739822 411.596771,57.421890 406.255829,56.922867   C397.642944,56.118137 391.102997,58.709095 386.885193,66.434677   C385.703888,68.598389 384.575104,70.790771 383.422272,72.970016   C383.722168,73.514870 384.022095,74.059731 384.321991,74.604584   C392.054077,70.083344 397.026855,73.986893 401.934357,79.825798  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M483.093506,37.001335   C489.355042,38.039059 495.253998,38.716209 500.894775,40.308155   C502.899902,40.874023 504.027496,44.028629 505.988098,45.368954   C512.204956,49.618954 514.778687,55.885674 515.288330,62.848991   C515.663879,67.980537 514.464478,73.207703 514.297791,78.402893   C513.998169,87.742340 506.987915,93.127739 501.862549,99.471237   C494.098022,109.081215 475.151459,114.338776 463.692200,109.892006   C454.051025,106.150749 445.020691,99.621635 442.768646,89.632736   C439.352753,74.481773 443.264801,60.647564 454.967590,48.668255   C463.058594,40.386047 472.119354,37.810905 483.093506,37.001335  M494.866364,76.025093   C498.415955,68.323662 493.528107,63.289471 488.861816,58.597263   C486.007660,55.727192 475.975342,56.404934 472.338806,58.919941   C466.623199,62.872807 462.643463,70.753777 463.973053,76.355240   C468.496582,73.930962 472.520996,70.209221 478.343903,74.196098   C483.270142,77.569038 486.182312,81.447418 486.286438,88.027489   C488.220428,85.629181 489.619293,84.039322 490.850067,82.328560   C492.149536,80.522308 493.288757,78.600784 494.866364,76.025093  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M143.202972,41.311676   C145.952240,37.996475 149.062195,36.475677 153.071136,37.016701   C157.988281,37.680290 160.314102,39.878269 159.924698,44.718224   C159.159134,54.233337 158.536987,63.823067 156.750946,73.170883   C155.554749,79.431564 153.358459,85.909904 149.941666,91.216927   C146.831848,96.047142 141.913147,100.112915 136.997086,103.283356   C130.153625,107.696808 122.690239,110.211304 113.968826,110.288261   C101.442169,110.398788 88.428650,101.205498 84.739090,88.000999   C83.024315,81.864052 84.383430,76.739021 85.133659,71.191963   C86.300148,62.567097 87.757767,53.981922 88.967491,45.362450   C89.615555,40.744915 95.678360,36.436367 101.007744,37.021843   C105.676140,37.534702 108.624352,41.391354 107.943359,46.713051   C106.670670,56.658611 105.312737,66.599159 103.682632,76.491096   C102.512337,83.592789 106.395706,88.987846 113.188866,88.999969   C114.855347,89.002945 116.526413,88.915451 118.187614,89.008316   C132.488388,89.807793 135.583206,82.090973 136.991501,70.879448   C138.016129,62.722507 138.873611,54.541100 140.111572,46.417221   C140.372803,44.702976 141.966736,43.191818 143.202972,41.311676  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M190.981445,76.756996   C192.316528,65.056946 193.372421,53.764400 195.198639,42.597836   C195.544525,40.482868 198.664749,38.055878 201.015030,37.236900   C203.685898,36.306217 207.036026,36.552380 209.882385,37.201347   C211.468613,37.563000 213.177460,39.567867 213.833145,41.226658   C214.512070,42.944244 213.984238,45.138844 213.984238,47.245415   C218.754837,49.378136 225.958237,48.875553 225.707901,56.281353   C225.469299,63.340530 221.094986,66.329086 210.630524,67.475479   C210.112122,73.558487 209.410980,79.868134 209.180054,86.194946   C209.136505,87.388344 210.710312,89.231125 211.971619,89.783302   C218.739456,92.746101 218.859451,92.646324 217.974976,100.185287   C217.699921,102.529839 217.555359,105.300735 216.240234,107.033257   C212.652222,111.760078 204.631866,111.513954 199.403839,107.700546   C193.464905,103.368584 190.145721,97.161438 188.480057,90.695694   C187.445587,86.680122 190.016678,81.735710 190.981445,76.756996  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M187.998169,50.139675   C185.323303,66.945450 182.560547,83.313309 180.037079,99.717979   C179.158630,105.428665 171.888779,110.888550 165.716415,109.964325   C160.052841,109.116295 156.800888,103.418869 157.866089,96.999931   C160.687347,79.999092 163.351303,62.971786 166.000671,45.943005   C166.816574,40.698860 173.866943,36.152283 180.127014,37.029640   C186.365631,37.903992 189.261017,42.567078 187.998169,50.139675  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M185.341919,8.268729   C191.289886,3.142223 199.015869,1.966655 207.587463,4.722573   C210.255737,14.352103 203.669357,20.925163 197.699219,25.009474   C189.070358,30.912674 178.389008,33.653679 166.564026,31.089470   C171.006699,21.355114 175.663284,13.027255 185.341919,8.268729  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M344.801239,88.985794   C344.903015,89.310966 345.004791,89.636131 344.895813,90.099632   C343.093994,90.137939 341.502930,90.037910 339.911835,89.937881   C339.911835,89.937881 339.974945,90.010857 340.007782,90.046173   C340.040619,90.081482 340.054474,89.587997 340.049316,89.341507   C340.044159,89.095016 340.179382,89.078644 340.572876,89.035843   C342.244659,88.990631 343.522949,88.988213 344.801239,88.985794  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M185.378571,6.359238   C185.600784,6.335526 185.679794,6.431610 185.758789,6.527695   C185.584320,6.511476 185.409836,6.495254 185.378571,6.359238  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M340.089325,90.316589   C341.502930,90.037910 343.093994,90.137939 345.043762,90.588829   C345.402466,90.939690 345.365906,90.867577 345.366577,90.829269   C343.667114,90.759071 341.966949,90.727180 340.089325,90.316589  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M344.652557,88.680679   C343.522949,88.988213 342.244659,88.990631 340.583099,88.968521   C341.634521,88.754509 343.069183,88.565033 344.652557,88.680679  z"
        />
      </svg>
    </span>
  );
};
export const LogoWithLink = ({ className }: { className?: string }) => {
  return (
    <Link
      to="."
      className={cn(
        "w-24 h-12 justify-center text-primary flex items-center",
        className
      )}
    >
      {" "}
      <svg
        className="text-forground"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width="100%"
        viewBox="0 0 600 198"
        enableBackground="new 0 0 600 198"
        xmlSpace="preserve"
      >
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M346.638275,89.938667   C352.223541,94.123573 352.883728,100.058250 351.822876,106.195572   C349.674744,118.623413 350.447998,131.023422 355.308929,142.364258   C359.114716,151.243362 364.227936,159.596802 372.748932,165.943649   C378.379333,170.137436 384.416870,172.219635 390.315369,175.256424   C404.145752,182.376740 418.545868,180.381927 432.839966,178.780426   C438.172119,178.183014 443.297638,175.315704 448.399689,173.199707   C454.650238,170.607376 461.421967,168.612183 466.800262,164.737457   C474.081940,159.491425 481.546204,153.607040 486.599365,146.368134   C494.208374,135.467819 500.949829,123.596283 501.001831,109.455276   C501.018677,104.876068 504.686768,98.986778 508.101715,98.032700   C512.995178,96.665573 516.044128,99.089531 520.230774,103.831512   C524.411987,108.567345 521.523010,113.115562 520.633240,116.904335   C518.278198,126.932877 514.983032,136.892807 510.708801,146.262741   C508.047333,152.097061 503.124481,156.979126 498.850861,161.975769   C494.813629,166.696014 490.717712,171.539017 485.880249,175.355316   C480.595459,179.524551 474.332703,182.429718 468.672668,186.153992   C461.667145,190.763672 453.936493,193.667236 446.122375,196.449127   C444.497406,197.027634 442.923004,197.748260 441.662659,198.701691   C425.312439,199.000000 408.624878,199.000000 391.468658,199.000000   C389.759552,198.021088 388.664551,196.655930 387.255310,196.125259   C377.237946,192.352951 367.280365,188.685257 359.687836,180.476120   C355.782867,176.253983 350.014832,173.457047 346.985626,168.785934   C341.010223,159.571915 334.400940,150.394363 333.945007,138.590363   C333.551514,128.402145 332.174805,118.232315 332.186554,108.055466   C332.193512,102.047699 332.170349,95.419586 337.634094,90.880196   C338.108795,90.485786 338.750488,90.292282 339.644775,90.008163   C339.974945,90.010857 339.911835,89.937881 340.089325,90.316589   C341.966949,90.727180 343.667114,90.759071 345.436035,90.495560   C345.882629,90.112999 346.260468,90.025833 346.638275,89.938667  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M1.000000,63.468658   C1.999039,59.722073 3.335541,56.502995 3.919797,53.152733   C4.848194,47.829090 4.420239,42.131996 6.101917,37.106865   C9.048893,28.300823 13.062068,19.883747 20.682335,13.771818   C31.566628,5.041934 43.607407,1.909421 57.404819,4.681987   C67.719170,6.754637 74.062843,12.869350 78.629539,22.001404   C83.357010,31.454964 82.736542,40.526436 79.304161,50.119762   C77.841614,54.207485 78.113914,58.890331 77.352509,63.259983   C75.897240,71.611755 74.266228,79.932907 72.661713,88.515198   C73.832954,88.916519 75.727646,89.166435 77.124176,90.134796   C79.403030,91.714943 81.974312,93.175720 79.329079,96.977402   C77.748871,99.248444 77.717384,102.589233 76.956757,105.440369   C75.964188,109.160889 72.503098,111.380234 68.827034,110.336700   C64.028221,108.974449 59.363003,107.119003 54.533257,105.899826   C52.692917,105.435257 50.120968,105.469818 48.627247,106.432533   C40.740265,111.515747 26.848656,111.492516 19.028986,106.073532   C15.691760,103.760849 11.925310,101.953484 8.962422,99.249664   C6.450360,96.957245 4.814051,93.705162 2.697647,90.748421   C2.676841,90.758179 2.014004,91.068954 1.175583,91.689865   C1.000000,82.645767 1.000000,73.291542 1.000000,63.468658  M40.165722,68.864037   C46.850475,66.891830 47.703030,67.366615 50.117062,73.367752   C50.651188,74.695549 52.135643,75.641060 53.182514,76.762604   C54.159500,75.482323 55.772938,74.309349 56.009830,72.904282   C57.509689,64.008270 58.858360,55.079342 59.934555,46.122540   C60.457516,41.770100 61.097912,37.164459 60.227776,32.976223   C59.002350,27.077858 53.549114,24.988951 48.294334,24.164055   C41.799381,23.144470 36.101757,26.072815 31.093916,29.914070   C25.836351,33.946877 27.201159,40.407917 26.069031,45.887840   C25.039986,50.868805 24.648912,55.978081 23.829727,61.006866   C22.980179,66.222038 21.449152,71.378754 21.141064,76.615456   C20.802574,82.368919 26.484612,87.136101 31.918890,86.249840   C31.292906,82.409874 29.898615,78.499191 30.228970,74.740067   C30.668636,69.737061 34.596188,68.296097 40.165722,68.864037  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M601.000000,26.531376   C600.005310,29.780916 598.530029,32.491814 598.112610,35.356842   C597.140442,42.029621 596.915588,48.810631 595.960510,55.486633   C593.744080,70.978905 591.443542,86.463379 588.848816,101.895821   C587.101013,112.290977 578.255432,115.230606 569.998474,108.669342   C568.870544,107.773041 566.314880,107.482704 565.052917,108.135338   C555.420593,113.116623 545.969238,112.777763 536.371887,108.114441   C529.978149,105.007736 525.901184,99.371902 521.513733,94.278099   C515.912109,87.774628 517.133240,70.949341 522.854004,64.071144   C523.679504,63.078625 524.369751,61.832874 524.700256,60.591835   C527.214661,51.150219 535.439209,46.851231 542.619263,42.515270   C551.071167,37.411255 561.109253,37.220245 570.808044,39.470028   C574.954285,40.431805 576.627563,39.992260 577.194580,35.121834   C578.161560,26.815214 579.990295,18.579025 581.956909,10.433939   C582.702332,7.346197 584.831055,4.592431 586.164673,1.343229   C590.024536,1.000000 594.049072,1.000000 598.206909,1.301256   C599.226868,2.401670 600.113464,3.200826 601.000000,3.999992   C601.000000,11.354252 601.000000,18.708504 601.000000,26.531376  M541.113037,71.862999   C540.873962,73.317612 540.163574,74.887733 540.486267,76.204681   C541.372009,79.818878 541.665344,84.495079 544.073425,86.610527   C547.957397,90.022530 553.331421,90.472527 558.854370,89.079666   C563.363892,87.942375 565.689697,84.736397 568.790405,81.965195   C573.847595,77.445366 572.624634,71.639908 571.466003,66.866722   C570.435791,62.622711 566.209473,59.369129 561.298340,57.994808   C554.018127,55.957512 542.440063,65.079010 541.113037,71.862999  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M601.000000,3.499990   C600.113464,3.200826 599.226868,2.401670 598.670166,1.301254   C599.666687,1.666663 600.333313,2.333329 601.000000,3.499990  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M347.045197,89.971909   C346.260468,90.025833 345.882629,90.112999 345.435364,90.533875   C345.365906,90.867577 345.402466,90.939690 345.254517,90.450493   C345.004791,89.636131 344.903015,89.310966 344.652557,88.680679   C343.069183,88.565033 341.634521,88.754509 340.189606,89.011314   C340.179382,89.078644 340.044159,89.095016 340.044159,89.095016   C338.234406,88.803329 336.424622,88.511635 334.517456,88.204247   C335.426361,81.546555 336.387817,74.503876 337.349274,67.461197   C336.907043,67.218430 336.464813,66.975670 336.022583,66.732903   C334.654419,67.681557 333.036316,68.409302 331.965424,69.620720   C328.878937,73.112167 326.070648,76.847687 323.046600,80.396584   C319.052429,85.083954 313.539612,86.853912 307.890656,85.765282   C303.177032,84.856888 299.069946,82.079262 297.608948,76.532745   C296.940460,73.995026 294.786804,71.855080 293.340240,69.514015   C291.768921,66.971077 290.236542,64.404045 288.319305,61.240532   C286.835388,73.593140 285.243195,85.382614 284.074097,97.213905   C283.513641,102.885956 279.531189,108.484016 274.092560,109.887474   C269.902496,110.968742 261.669220,103.659271 262.388123,99.248207   C264.612457,85.599472 267.148560,72.000618 269.285126,58.338848   C270.478027,50.711109 271.098907,42.994652 272.013153,35.322418   C273.162262,25.679214 284.286102,19.385927 291.975037,24.028490   C292.812103,24.533913 293.783417,25.093145 294.252899,25.887297   C297.883148,32.027962 301.519287,38.170654 304.923157,44.437870   C307.468719,49.124737 309.664612,54.001186 312.029144,58.786804   C313.868164,62.508831 315.757477,61.023277 317.567627,58.781250   C322.865540,52.219376 328.113068,45.616726 333.424652,39.066013   C336.793121,34.911686 340.283142,30.855745 343.641357,26.693331   C347.282471,22.180202 352.252502,20.817577 357.116028,23.125069   C360.766479,24.857027 362.920044,30.849569 362.204407,35.830368   C360.988647,44.292271 360.335571,52.837845 359.019470,61.281773   C357.496674,71.051796 355.512878,80.749962 353.672699,90.787811   C351.530090,90.518234 349.491089,90.261696 347.045197,89.971909  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M363.032349,73.437714   C364.441620,59.299271 374.178894,50.821762 382.986816,41.984043   C385.129669,39.833904 389.322601,39.648037 392.623871,38.745514   C404.251312,35.566742 415.468506,36.259521 425.791901,42.977989   C434.671570,48.756870 439.543121,62.627522 437.573364,73.110077   C435.315857,85.123970 429.198578,95.199944 419.892273,101.971390   C411.825562,107.840889 402.695129,112.541656 390.861267,110.580070   C380.119720,108.799553 372.303650,104.139656 366.635315,95.898209   C362.243042,89.512115 362.665863,81.499512 363.032349,73.437714  M401.934357,79.825798   C402.928314,83.141464 403.905640,86.472054 408.416138,86.792351   C414.372253,82.866867 415.371552,76.205605 415.729370,69.984741   C416.031097,64.739822 411.596771,57.421890 406.255829,56.922867   C397.642944,56.118137 391.102997,58.709095 386.885193,66.434677   C385.703888,68.598389 384.575104,70.790771 383.422272,72.970016   C383.722168,73.514870 384.022095,74.059731 384.321991,74.604584   C392.054077,70.083344 397.026855,73.986893 401.934357,79.825798  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M483.093506,37.001335   C489.355042,38.039059 495.253998,38.716209 500.894775,40.308155   C502.899902,40.874023 504.027496,44.028629 505.988098,45.368954   C512.204956,49.618954 514.778687,55.885674 515.288330,62.848991   C515.663879,67.980537 514.464478,73.207703 514.297791,78.402893   C513.998169,87.742340 506.987915,93.127739 501.862549,99.471237   C494.098022,109.081215 475.151459,114.338776 463.692200,109.892006   C454.051025,106.150749 445.020691,99.621635 442.768646,89.632736   C439.352753,74.481773 443.264801,60.647564 454.967590,48.668255   C463.058594,40.386047 472.119354,37.810905 483.093506,37.001335  M494.866364,76.025093   C498.415955,68.323662 493.528107,63.289471 488.861816,58.597263   C486.007660,55.727192 475.975342,56.404934 472.338806,58.919941   C466.623199,62.872807 462.643463,70.753777 463.973053,76.355240   C468.496582,73.930962 472.520996,70.209221 478.343903,74.196098   C483.270142,77.569038 486.182312,81.447418 486.286438,88.027489   C488.220428,85.629181 489.619293,84.039322 490.850067,82.328560   C492.149536,80.522308 493.288757,78.600784 494.866364,76.025093  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M143.202972,41.311676   C145.952240,37.996475 149.062195,36.475677 153.071136,37.016701   C157.988281,37.680290 160.314102,39.878269 159.924698,44.718224   C159.159134,54.233337 158.536987,63.823067 156.750946,73.170883   C155.554749,79.431564 153.358459,85.909904 149.941666,91.216927   C146.831848,96.047142 141.913147,100.112915 136.997086,103.283356   C130.153625,107.696808 122.690239,110.211304 113.968826,110.288261   C101.442169,110.398788 88.428650,101.205498 84.739090,88.000999   C83.024315,81.864052 84.383430,76.739021 85.133659,71.191963   C86.300148,62.567097 87.757767,53.981922 88.967491,45.362450   C89.615555,40.744915 95.678360,36.436367 101.007744,37.021843   C105.676140,37.534702 108.624352,41.391354 107.943359,46.713051   C106.670670,56.658611 105.312737,66.599159 103.682632,76.491096   C102.512337,83.592789 106.395706,88.987846 113.188866,88.999969   C114.855347,89.002945 116.526413,88.915451 118.187614,89.008316   C132.488388,89.807793 135.583206,82.090973 136.991501,70.879448   C138.016129,62.722507 138.873611,54.541100 140.111572,46.417221   C140.372803,44.702976 141.966736,43.191818 143.202972,41.311676  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M190.981445,76.756996   C192.316528,65.056946 193.372421,53.764400 195.198639,42.597836   C195.544525,40.482868 198.664749,38.055878 201.015030,37.236900   C203.685898,36.306217 207.036026,36.552380 209.882385,37.201347   C211.468613,37.563000 213.177460,39.567867 213.833145,41.226658   C214.512070,42.944244 213.984238,45.138844 213.984238,47.245415   C218.754837,49.378136 225.958237,48.875553 225.707901,56.281353   C225.469299,63.340530 221.094986,66.329086 210.630524,67.475479   C210.112122,73.558487 209.410980,79.868134 209.180054,86.194946   C209.136505,87.388344 210.710312,89.231125 211.971619,89.783302   C218.739456,92.746101 218.859451,92.646324 217.974976,100.185287   C217.699921,102.529839 217.555359,105.300735 216.240234,107.033257   C212.652222,111.760078 204.631866,111.513954 199.403839,107.700546   C193.464905,103.368584 190.145721,97.161438 188.480057,90.695694   C187.445587,86.680122 190.016678,81.735710 190.981445,76.756996  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M187.998169,50.139675   C185.323303,66.945450 182.560547,83.313309 180.037079,99.717979   C179.158630,105.428665 171.888779,110.888550 165.716415,109.964325   C160.052841,109.116295 156.800888,103.418869 157.866089,96.999931   C160.687347,79.999092 163.351303,62.971786 166.000671,45.943005   C166.816574,40.698860 173.866943,36.152283 180.127014,37.029640   C186.365631,37.903992 189.261017,42.567078 187.998169,50.139675  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M185.341919,8.268729   C191.289886,3.142223 199.015869,1.966655 207.587463,4.722573   C210.255737,14.352103 203.669357,20.925163 197.699219,25.009474   C189.070358,30.912674 178.389008,33.653679 166.564026,31.089470   C171.006699,21.355114 175.663284,13.027255 185.341919,8.268729  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M344.801239,88.985794   C344.903015,89.310966 345.004791,89.636131 344.895813,90.099632   C343.093994,90.137939 341.502930,90.037910 339.911835,89.937881   C339.911835,89.937881 339.974945,90.010857 340.007782,90.046173   C340.040619,90.081482 340.054474,89.587997 340.049316,89.341507   C340.044159,89.095016 340.179382,89.078644 340.572876,89.035843   C342.244659,88.990631 343.522949,88.988213 344.801239,88.985794  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M185.378571,6.359238   C185.600784,6.335526 185.679794,6.431610 185.758789,6.527695   C185.584320,6.511476 185.409836,6.495254 185.378571,6.359238  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M340.089325,90.316589   C341.502930,90.037910 343.093994,90.137939 345.043762,90.588829   C345.402466,90.939690 345.365906,90.867577 345.366577,90.829269   C343.667114,90.759071 341.966949,90.727180 340.089325,90.316589  z"
        />
        <path
          fill="currentColor"
          opacity={1.0}
          stroke="none"
          d=" M344.652557,88.680679   C343.522949,88.988213 342.244659,88.990631 340.583099,88.968521   C341.634521,88.754509 343.069183,88.565033 344.652557,88.680679  z"
        />
      </svg>
    </Link>
  );
};
