import { describe, expect, it } from "vitest";
import { splitSlideTitle } from "./title-lines";

describe("splitSlideTitle", () => {
  it("keeps the delimiter in the headline and puts the remaining wording in the subtitle", () => {
    expect(splitSlideTitle("Grounding the Harness: Context References vs. Files on Disk")).toEqual({
      headline: "Grounding the Harness:",
      subtitle: "Context References vs. Files on Disk"
    });
  });

  it("does not split a time", () => {
    expect(splitSlideTitle("The 4:15 PM Green-Checkmark Trap")).toEqual({
      headline: "The 4:15 PM Green-Checkmark Trap",
      subtitle: ""
    });
  });

  it("splits a later delimiter after a time", () => {
    expect(splitSlideTitle("The 16:30 Review: Inspect the Evidence")).toEqual({
      headline: "The 16:30 Review:",
      subtitle: "Inspect the Evidence"
    });
  });

  it("does not mistake a module number for a time", () => {
    expect(splitSlideTitle("Module 2: Agentic Development Across the SDLC")).toEqual({
      headline: "Module 2:",
      subtitle: "Agentic Development Across the SDLC"
    });
  });

  it("keeps subsequent subtitle colons intact", () => {
    expect(splitSlideTitle("Mission: Context: Inspect and Verify")).toEqual({
      headline: "Mission:",
      subtitle: "Context: Inspect and Verify"
    });
  });

  it("leaves titles without a subtitle unchanged", () => {
    expect(splitSlideTitle("Session Agenda")).toEqual({ headline: "Session Agenda", subtitle: "" });
    expect(splitSlideTitle("Next:")).toEqual({ headline: "Next:", subtitle: "" });
  });
});
