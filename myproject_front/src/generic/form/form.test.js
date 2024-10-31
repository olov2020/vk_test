import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import Form from "./Form.tsx";
import Input from "./input/Input.tsx";

import "@testing-library/jest-dom/extend-expect";
import {jest} from "globals";

jest.mock("../../api/userApi.ts", () => ({
    getListOfItems: jest.fn(() => Promise.resolve("mock data"))
}));

describe("Form Component", () => {
    const mockSetItems = jest.fn();

    beforeEach(() => {
        mockSetItems.mockClear();
    });

    it("renders the form correctly", () => {
        render(<Form setItems={mockSetItems}/>);

        expect(screen.getByRole("form")).toBeInTheDocument();
        expect(screen.getByText("Get interesting fact!")).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: "min"})).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: "max"})).toBeInTheDocument();
    });

    it("calls setItems with new items on submit", async () => {
        render(<Form setItems={mockSetItems}/>);

        const minInput = screen.getByRole("textbox", {name: "min"});
        const maxInput = screen.getByRole("textbox", {name: "max"});
        const submitButton = screen.getByRole("button", {type: "submit"});

        fireEvent.change(minInput, {target: {value: "1"}});
        fireEvent.change(maxInput, {target: {value: "5"}});
        fireEvent.click(submitButton);

        // Wait for the async function to finish
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(mockSetItems).toHaveBeenCalledTimes(1);
        expect(mockSetItems).toHaveBeenCalledWith([
            {id: 0, value: "mock data"},
            {id: 1, value: "mock data"},
            {id: 2, value: "mock data"},
            {id: 3, value: "mock data"},
            {id: 4, value: "mock data"},
            {id: 5, value: "mock data"},
            {id: 6, value: "mock data"},
            {id: 7, value: "mock data"},
            {id: 8, value: "mock data"},
            {id: 9, value: "mock data"},
            {id: 10, value: "mock data"},
            {id: 11, value: "mock data"},
            {id: 12, value: "mock data"},
            {id: 13, value: "mock data"},
            {id: 14, value: "mock data"},
            {id: 15, value: "mock data"},
            {id: 16, value: "mock data"},
            {id: 17, value: "mock data"},
            {id: 18, value: "mock data"},
            {id: 19, value: "mock data"},
            {id: 20, value: "mock data"},
            {id: 21, value: "mock data"},
            {id: 22, value: "mock data"},
            {id: 23, value: "mock data"},
            {id: 24, value: "mock data"},
            {id: 25, value: "mock data"},
            {id: 26, value: "mock data"},
            {id: 27, value: "mock data"},
            {id: 28, value: "mock data"},
            {id: 29, value: "mock data"},
            {id: 30, value: "mock data"},
            {id: 31, value: "mock data"},
            {id: 32, value: "mock data"},
            {id: 33, value: "mock data"},
            {id: 34, value: "mock data"},
            {id: 35, value: "mock data"},
            {id: 36, value: "mock data"},
            {id: 37, value: "mock data"},
            {id: 38, value: "mock data"},
            {id: 39, value: "mock data"},
            {id: 40, value: "mock data"},
            {id: 41, value: "mock data"},
            {id: 42, value: "mock data"},
            {id: 43, value: "mock data"},
            {id: 44, value: "mock data"},
            {id: 45, value: "mock data"},
            {id: 46, value: "mock data"},
            {id: 47, value: "mock data"},
            {id: 48, value: "mock data"},
            {id: 49, value: "mock data"},
            {id: 50, value: "mock data"},
            {id: 51, value: "mock data"},
            {id: 52, value: "mock data"},
            {id: 53, value: "mock data"},
            {id: 54, value: "mock data"},
            {id: 55, value: "mock data"},
            {id: 56, value: "mock data"},
            {id: 57, value: "mock data"},
            {id: 58, value: "mock data"},
            {id: 59, value: "mock data"},
            {id: 60, value: "mock data"},
            {id: 61, value: "mock data"},
            {id: 62, value: "mock data"},
            {id: 63, value: "mock data"},
            {id: 64, value: "mock data"},
            {id: 65, value: "mock data"},
            {id: 66, value: "mock data"},
            {id: 67, value: "mock data"},
            {id: 68, value: "mock data"},
            {id: 69, value: "mock data"},
            {id: 70, value: "mock data"},
            {id: 71, value: "mock data"},
            {id: 72, value: "mock data"},
            {id: 73, value: "mock data"},
            {id: 74, value: "mock data"},
            {id: 75, value: "mock data"},
            {id: 76, value: "mock data"},
            {id: 77, value: "mock data"},
            {id: 78, value: "mock data"},
            {id: 79, value: "mock data"},
            {id: 80, value: "mock data"},
            {id: 81, value: "mock data"},
            {id: 82, value: "mock data"},
            {id: 83, value: "mock data"},
            {id: 84, value: "mock data"},
            {id: 85, value: "mock data"},
            {id: 86, value: "mock data"},
            {id: 87, value: "mock data"},
            {id: 88, value: "mock data"},
            {id: 89, value: "mock data"},
            {id: 90, value: "mock data"},
            {id: 91, value: "mock data"},
            {id: 92, value: "mock data"},
            {id: 93, value: "mock data"},
            {id: 94, value: "mock data"},
            {id: 95, value: "mock data"},
            {id: 96, value: "mock data"},
            {id: 97, value: "mock data"},
            {id: 98, value: "mock data"},
            {id: 99, value: "mock data"},
        ]);
    });

    it("shows error message if form is not valid", async () => {
        render(<Form setItems={mockSetItems}/>);

        const minInput = screen.getByRole("textbox", {name: "min"});
        const maxInput = screen.getByRole("textbox", {name: "max"});
        const submitButton = screen.getByRole("button", {type: "submit"});

        fireEvent.change(minInput, {target: {value: "10"}});
        fireEvent.change(maxInput, {target: {value: "1"}});
        fireEvent.click(submitButton);

        // Wait for the async function to finish
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(screen.getByText("Error submitting form")).toBeInTheDocument();
    });

    it("shows error message if inputs are not filled", async () => {
        render(<Form setItems={mockSetItems}/>);

        const submitButton = screen.getByRole("button", {type: "submit"});
        fireEvent.click(submitButton);

        // Wait for the async function to finish
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(screen.getByText("Fill inputs")).toBeInTheDocument();
    });

    it("shows loading indicator while submitting", async () => {
        render(<Form setItems={mockSetItems}/>);

        const minInput = screen.getByRole("textbox", {name: "min"});
        const maxInput = screen.getByRole("textbox", {name: "max"});
        const submitButton = screen.getByRole("button", {type: "submit"});

        fireEvent.change(minInput, {target: {value: "1"}});
        fireEvent.change(maxInput, {target: {value: "5"}});
        fireEvent.click(submitButton);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("disables submit button while loading", async () => {
        render(<Form setItems={mockSetItems}/>);

        const minInput = screen.getByRole("textbox", {name: "min"});
        const maxInput = screen.getByRole("textbox", {name: "max"});
        const submitButton = screen.getByRole("button", {type: "submit"});

        fireEvent.change(minInput, {target: {value: "1"}});
        fireEvent.change(maxInput, {target: {value: "5"}});
        fireEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
    });

    it("validates input values correctly", () => {
        render(<Form setItems={mockSetItems}/>);

        const minInput = screen.getByRole("textbox", {name: "min"});
        const maxInput = screen.getByRole("textbox", {name: "max"});

        fireEvent.change(minInput, {target: {value: "-1"}});
        expect(screen.getByText("Value is incorrect")).toBeInTheDocument();

        fireEvent.change(minInput, {target: {value: "1e10"}});
        expect(screen.getByText("Value is incorrect")).toBeInTheDocument();

        fireEvent.change(minInput, {target: {value: "5"}});
        expect(screen.queryByText("Value is incorrect")).not.toBeInTheDocument();

        fireEvent.change(maxInput, {target: {value: "-1"}});
        expect(screen.getByText("Value is incorrect")).toBeInTheDocument();

        fireEvent.change(maxInput, {target: {value: "1e10"}});
        expect(screen.getByText("Value is incorrect")).toBeInTheDocument();

        fireEvent.change(maxInput, {target: {value: "10"}});
        expect(screen.queryByText("Value is incorrect")).not.toBeInTheDocument();
    });
});
