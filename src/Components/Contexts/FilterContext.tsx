import {createContext} from "react";

interface FilterContextInterface {}

const FilterContext = createContext<FilterContextInterface | null>(null);
