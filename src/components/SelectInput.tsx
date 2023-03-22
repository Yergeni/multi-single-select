import React, { useEffect, useRef, useState } from "react";
import { Option, SelectInputProps } from "./SelectInput.types";
import styles from "./SelectInput.module.css";

export default function SelectInput({
	multiple,
	options,
	selectedValue,
	onChange,
	label,
}: SelectInputProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [optionHighligthedIndex, setOptionHighligthedIndex] = useState(0);

	const showMenuClass = isOpen ? styles.show : "";
	const openCaretClass = isOpen ? styles.open : "";

	const optionSelectedClass = (option: Option) => {
		if (multiple) {
			return selectedValue.includes(option) ? styles.selected : "";
		} else {
			return option.value === selectedValue?.value ? styles.selected : "";
		}
	};

	const handleOpenMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const handleOnBlur = () => {
		setOptionHighligthedIndex(0);
		setIsOpen(false);
	};

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation();
		multiple ? onChange([]) : onChange(undefined);
	};

	const handleSelectedOption = (option: Option, e?: React.MouseEvent) => {
		if (multiple) {
			e?.stopPropagation(); // avoid to open the list menu
			if (selectedValue.includes(option)) {
				onChange(selectedValue.filter((o) => o !== option));
			} else {
				onChange([...selectedValue, option]);
			}
		} else {
			if (option !== selectedValue) onChange(option);
		}
	};

	const renderValue = () => {
		if (multiple) {
			return selectedValue.map((option) => (
				<button
					className={styles["option-bagde"]}
					key={option.value}
					onClick={(e) => handleSelectedOption(option, e)}
				>
					{option.label}
					<span className={styles["remove-option-btn"]}>&times;</span>
				</button>
			));
		} else {
			return selectedValue?.label;
		}
	};

	useEffect(() => {
		const handleKeyboard = (e: KeyboardEvent) => {
			if (e.target !== containerRef.current) return;

			switch (e.code) {
				case "Enter":
				case "Space":
					handleOpenMenu();
					if (isOpen) handleSelectedOption(options[optionHighligthedIndex]);
					break;
				case "ArrowUp":
				case "ArrowDown": {
					if (!isOpen) {
						setIsOpen(true);
						break;
					}
					const newValue =
						optionHighligthedIndex + (e.code === "ArrowDown" ? 1 : -1);
					if (newValue >= 0 && newValue < options.length) {
						setOptionHighligthedIndex(newValue);
					}
					break;
				}
				case "Escape":
					setIsOpen(false);
					break;
				default:
					break;
			}
		};

		containerRef.current?.addEventListener("keydown", handleKeyboard);

		return () => {
			containerRef.current?.removeEventListener("keydown", handleKeyboard);
		};
	}, [options, isOpen, optionHighligthedIndex]);

	return (
		<div
			ref={containerRef}
			tabIndex={0}
			className={styles.container}
			onClick={handleOpenMenu}
			onBlur={handleOnBlur}
		>
			{label && <div className={styles.label}>{label}</div>}
			<span className={styles.value}>{renderValue()}</span>
			<button className={styles["clear-btn"]} onClick={handleClear}>
				&times;
			</button>
			<div className={styles.divider} />
			<div
				className={`${styles.caret} ${openCaretClass}`}
				onClick={handleOpenMenu}
			/>
			{/* Option list */}
			<ul className={`${styles.options} ${showMenuClass}`}>
				{options.map((option, index) => {
					const { label, value } = option;
					return (
						<li
							key={value}
							className={`
                ${styles.option} 
                ${optionSelectedClass(option)} 
                ${index === optionHighligthedIndex ? styles.highlighted : ""}
              `}
							onClick={(e) => handleSelectedOption(option, e)}
							onMouseEnter={() => setOptionHighligthedIndex(index)}
						>
							{label}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
