import Image from "next/image"

/**
 * The portrait, as an exhibit affixed to the file.
 *
 * A photograph is the one thing this design system had no vocabulary for. The
 * obvious moves were all wrong for it: a rounded avatar belongs to a profile
 * card, a circular crop is the cheap stand-in for a cut-out, and any framed
 * plate would be the first card on a site that has none.
 *
 * So the photograph is not placed *on* the sheet — it is part of it. Three
 * things do that work:
 *
 *  1. The photograph's own ground is already near-ink (#0b0c0e), so the bottom
 *     edge is masked to transparent instead of cropped. The shoulders dissolve
 *     into the page and the face rises out of it; there is no boundary to draw
 *     because there is no boundary. This is an edge dissolve, not a contour
 *     mask tracing the subject — that would be the cheap version.
 *  2. The sheet's column rules continue straight across the image, exactly as
 *     they run behind every other section. Nothing else on the site would do
 *     that to a photo, and it is what makes this read as a document rather
 *     than as a picture of a person.
 *  3. The colour is pulled back toward the palette, not to grey. Full
 *     desaturation would make it an archival scan and lose the only warm thing
 *     on the page; holding a little saturation keeps it a person.
 */
export function PortraitPlate() {
  return (
    /* Capped on phones: at full column width the plate ate the first viewport
       and pushed the heading below the fold. An exhibit is pasted onto a page,
       not printed across it. */
    <figure className="relative w-full max-w-[16rem] md:max-w-none">
      {/* The exhibit's own rule, in the same grammar as every section head. */}
      <figcaption className="flex items-baseline justify-between gap-4 border-b border-rule-strong pb-2 font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
        <span>Retrato</span>
        <span aria-hidden="true">Medellín, CO</span>
      </figcaption>

      <div className="relative mt-5 aspect-[3/4] w-full">
        {/*
          The mask lives on this wrapper rather than the <Image> so Next's own
          positioning is untouched. Both properties are set: Safari still needs
          the prefix for mask-image on composited layers.
        */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, #000 0 58%, transparent 96%)",
            maskImage: "linear-gradient(to bottom, #000 0 58%, transparent 96%)",
          }}
        >
          <Image
            src="/profile.jpg"
            alt="Junior Carrillo, Tech Leader en pagos e infraestructura financiera, en Medellín"
            fill
            sizes="(max-width: 768px) 80vw, 26rem"
            priority
            className="object-cover object-top"
            style={{ filter: "saturate(0.55) contrast(1.06)" }}
          />
        </div>

        {/* The sheet, continuing across the exhibit. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, var(--ledger-rule) 0 1px, transparent 1px 5rem)",
            // Held low on purpose. At the weight the rules carry over flat ink
            // they read as a stripe drawn down the face; the job here is that
            // the sheet is felt to continue, not that it is read.
            opacity: 0.28,
          }}
        />

        {/* The margin rule of the sheet, running down the exhibit's left edge. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 left-0 w-0.5 bg-stamp opacity-55"
        />
      </div>
    </figure>
  )
}
