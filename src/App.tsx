import { useState } from "react";

import SelectInput from "./components/SelectInput";

import { Option } from "./components/SelectInput.types";

const options: Option[] = [
	{
		label: "first",
		value: 1,
	},
	{
		label: "Two",
		value: 2,
	},
	{
		label: "Three",
		value: 3,
	},
	{
		label: "Four",
		value: 4,
	},
	{
		label: "five",
		value: 5,
	},
	{
		label: "Six",
		value: 6,
	},
	{
		label: "Seven",
		value: 7,
	},
	{
		label: "Eitgh",
		value: 8,
	},
];

function App() {
	const [values, setValues] = useState<Option[]>([options[0]]);
	const [value, setValue] = useState<Option | undefined>(options[3]);

	return (
		<>
			<br />
			<SelectInput
				multiple
				// label="Multiple"
				options={options}
				selectedValue={values}
				onChange={(o) => setValues(o)}
			/>
			<br />
			<br />
			<br />
			<SelectInput
				// label="Single"
				options={options}
				selectedValue={value}
				onChange={(o) => setValue(o)}
			/>
		</>
	);
}

export default App;
