import { Smile } from "lucide-react";

import Chip from "../Chip";
import Wrapper from "./Wrapper";

export default function Testimonial() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="-top-28 -left-28 absolute border-[3px] border-green-foreground/30 rounded-full w-96 h-96" />
      <div className="-right-6 -bottom-12 absolute border-[3px] border-green-foreground/30 rounded-3xl w-[28rem] h-32" />
      <Wrapper className="flex flex-col justify-center items-center py-8 lg:py-16 w-full">
        <Chip
          Icon={Smile}
          text="Testimonial"
          className="flex items-center gap-2 bg-green-foreground/50 px-5 py-1 rounded-full max-w-fit font-semibold text-green text-lg capitalize"
        />
        <h3 className="my-4 max-w-[40rem] font-bold text-center text-green text-xl md:text-3xl lg:text-5xl leading-10">
          Echoes of Success With Our Outstanding Service
        </h3>
        <p className="text-gray-500 text-xl">
          Discover why our clients rave about our exceptional services and
          unparalleled results.
        </p>
        <div className="mx-auto max-w-screen-lg">{/* <TestimonyCard /> */}</div>
      </Wrapper>
    </div>
  );
}
