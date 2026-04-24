import { RivalDetails } from "@/types/rivals";
import { spaceGrotesk } from "@/app/fonts";
import { Swords } from "lucide-react";
import HeaderEyebrow from "@/components/HeaderEyebrow";
import RivalSection from "@/components/rivals/RivalSection";

const DUMMY_MOST_DEFEATED: RivalDetails[] = [
  {
    id: 3894387564,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc",
    username: "Alexei_88",
    rating: 2304,
    wins: 35,
    draw: 2,
    loss: 6,
  },
  {
    id: 3894387534,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc",
    username: "GM_V",
    rating: 2504,
    wins: 19,
    draw: 1,
    loss: 4,
  },
  {
    id: 3894387064,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc",
    username: "TheFishermannnnnnnn",
    rating: 2091,
    wins: 15,
    draw: 0,
    loss: 7,
  },
];

const DUMMY_BIGGEST_NEMESES: RivalDetails[] = [
  {
    id: 3894387564,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc",
    username: "DeepBlue_Clone",
    rating: 2359,
    wins: 3,
    draw: 0,
    loss: 17,
  },
  {
    id: 3894387534,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc",
    username: "Kasparov_ds",
    rating: 2650,
    wins: 5,
    draw: 0,
    loss: 16,
  },
  {
    id: 3894387064,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc",
    username: "Matrix_Rebornasddd",
    rating: 2991,
    wins: 8,
    draw: 0,
    loss: 17,
  },
];

export default function RivalsPage() {
  return (
    <>
      <section className="relative p-8 flex gap-12 justify-between bg-surfaceLow rounded-2xl">
        <header className="relative z-10 space-y-4 lg:w-3/4">
          <HeaderEyebrow>Competitive Landscape</HeaderEyebrow>
          <h1 className={spaceGrotesk.className}>
            Your Strategic <em className="text-primary">Nemesis</em> Map
          </h1>
          <p>
            Analyzing 1,248 matches across 89 unique opponents. Your dominance
            is clearest in mid-game transitions, while defensive structures
            remain your primary hurdle against high-ELO rivals.
          </p>
        </header>
        <div className="absolute top-0 right-0 p-8 size-fit flex justify-center items-center">
          <Swords className="size-42 fill-surfaceBright stroke-surfaceBright opacity-70" />
        </div>
      </section>
      <RivalSection
        title="Most Defeated"
        titleColor="text-primary"
        description="Opponents who struggle against your tactical patterns"
        rivals={DUMMY_MOST_DEFEATED}
        type="MOST_DEFEATED"
      />
      <RivalSection
        title="Biggest Nemeses"
        titleColor="text-tertiary"
        description="Rivals whose style currently counters your main openings"
        rivals={DUMMY_BIGGEST_NEMESES}
        type="BIGGEST_NEMESES"
      />
    </>
  );
}
