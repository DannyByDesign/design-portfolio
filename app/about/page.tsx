export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground min-h-screen px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto flex w-full max-w-[880px] flex-col gap-6">
        <p className="definition-kicker">about</p>
        <h1 className="text-[2.4rem] leading-[1.08] font-[560] tracking-[-0.02em] md:text-[2.85rem]">
          About
        </h1>
        <p className="paragraph-body">
          This is a placeholder about page. Content and narrative can be expanded in the next phase.
        </p>
        <div className="hairline" />
      </div>
    </main>
  );
}
