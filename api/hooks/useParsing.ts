import { useContext } from "react";
import { ParsingContext } from "../providers/ParsingProvider";

export const useParsing = () => useContext(ParsingContext);