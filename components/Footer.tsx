// import Image from "next/image";

// type FooterProps = {
//   logoSrc: string;
// };

// export default function Footer({ logoSrc }: FooterProps) {
//   return (
//     <footer className="mt-10 border-t border-white/[0.35] bg-gradient-to-r from-[#0A365B] via-[#145786] to-[#1D6B9E] py-10 text-white">
//       <div className="section-shell flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
//         <div className="flex items-center gap-4">
//           <div className="relative h-12 w-32 overflow-hidden rounded-xl border border-white/45 bg-white/95 p-1 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
//             <Image src={logoSrc} alt="Bluewoods logo" fill sizes="128px" className="object-contain" />
//           </div>
//           <div>
//             <p className="font-heading text-2xl">Bluewoods Homestay</p>
//             <p className="mt-1 text-blue-100">Your Nature Retreat</p>
//             <p className="mt-2 text-sm text-blue-100/90">&quot;Breathe in the Blue.&quot;</p>
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center gap-3 text-sm">
//           <a
//             href="https://www.airbnb.co.in/rooms/1627311904688187077"
//             target="_blank"
//             rel="noreferrer"
//             className="rounded-full border border-white/35 px-4 py-2 transition hover:bg-white/15"
//           >
//             Airbnb
//           </a>
//           <a
//             href="https://www.instagram.com/bluewoods_homestay"
//             target="_blank"
//             rel="noreferrer"
//             className="rounded-full border border-white/35 px-4 py-2 transition hover:bg-white/15"
//           >
//             Instagram
//           </a>
//           <a
//             href="tel:+919037386889"
//             className="rounded-full border border-white/35 px-4 py-2 transition hover:bg-white/15"
//           >
//             Contact
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Image from "next/image";

type FooterProps = {
  logoSrc: string;
};

export default function Footer({ logoSrc }: FooterProps) {
  return (
    <footer className="mt-10 border-t border-white/[0.35] bg-gradient-to-r from-[#0A365B] via-[#145786] to-[#1D6B9E] py-10 text-white">
      <div className="section-shell flex flex-col items-center justify-center text-center gap-5">
        
        <div className="flex flex-col items-center gap-4">
          
          <div className="relative h-16 w-[118px] overflow-hidden rounded-[24px] bg-white/12 p-[4px] backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
  <Image
    src={logoSrc}
    alt="Bluewoods logo"
    fill
    sizes="118px"
    className="object-contain rounded-[20px]"
    priority
  />
</div>

          <div>
            <p className="font-heading text-2xl sm:text-3xl">
              Bluewoods Homestay
            </p>

            <p className="mt-1 text-blue-100 text-sm sm:text-base">
              Your Nature Retreat
            </p>

            <p className="mt-2 text-sm italic text-blue-100/90">
              &quot;Breathe in the Blue.&quot;
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}