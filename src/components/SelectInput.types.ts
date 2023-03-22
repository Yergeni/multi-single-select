import { ReactNode } from "react";

export type Option = {
	label: string;
	value: string | number;
};

export type SingleSelectInputProps = {
  multiple?: false;
	selectedValue?: Option;
  onChange: (value?: Option) => void;
};

export type MultipleSelectInputProps = {
  multiple: true; // required
	selectedValue: Option[];
  onChange: (value: Option[]) => void;
};

export type SelectInputProps = {
	options: Option[];
  label?: ReactNode
} & (SingleSelectInputProps | MultipleSelectInputProps);
