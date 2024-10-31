import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import ItemsList from "./ItemsList";
import Item from "./item/Item"; // Assuming you have a mock for this component

jest.mock("./item/Item.tsx", () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div>Mock Item</div>),
  };
});

describe("ItemsList Component", () => {
  const mockItems = [
    {id: 0, value: "Fact 1"},
    {id: 1, value: "Fact 2"},
    {id: 2, value: "Fact 3"},
    {id: 3, value: "Fact 4"},
    {id: 4, value: "Fact 5"},
    {id: 5, value: "Fact 6"},
    {id: 6, value: "Fact 7"},
    {id: 7, value: "Fact 8"},
    {id: 8, value: "Fact 9"},
    {id: 9, value: "Fact 10"},
    {id: 10, value: "Fact 11"},
    {id: 11, value: "Fact 12"},
    {id: 12, value: "Fact 13"},
    {id: 13, value: "Fact 14"},
    {id: 14, value: "Fact 15"},
    {id: 15, value: "Fact 16"},
    {id: 16, value: "Fact 17"},
    {id: 17, value: "Fact 18"},
    {id: 18, value: "Fact 19"},
    {id: 19, value: "Fact 20"},
  ];

  it("renders the list correctly", () => {
    render(<ItemsList items={mockItems}/>);

    expect(screen.getByText("Fun facts about numbers")).toBeInTheDocument();
    expect(screen.getByText("While hovering text you may access input where you can change facts to your own")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(100); // Should render first page
  });

  it("handles page changes correctly", () => {
    render(<ItemsList items={mockItems}/>);

    const pageButtons = screen.getAllByRole("button", {name: /Page \d+/i});
    const secondPageButton = pageButtons[1]; // Assuming there are at least 2 pages

    fireEvent.click(secondPageButton);

    expect(screen.getAllByRole("listitem")).toHaveLength(100); // Should render second page
  });

  it("handles item deletion correctly", () => {
    render(<ItemsList items={mockItems}/>);

    // Mock the Item component's onDelete prop
    const mockOnDelete = jest.fn();
    Item.mockImplementation(() => <div onDelete={mockOnDelete}/>);

    const deleteButtons = screen.getAllByRole("button", {name: "Delete"});
    const firstDeleteButton = deleteButtons[0];

    fireEvent.click(firstDeleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(0);
    expect(screen.getAllByRole("listitem")).toHaveLength(99); // Should have one less item
  });

  it("updates pagination after deletion", () => {
    render(<ItemsList items={mockItems}/>);

    // Mock the Item component's onDelete prop
    const mockOnDelete = jest.fn();
    Item.mockImplementation(() => <div onDelete={mockOnDelete}/>);

    const deleteButtons = screen.getAllByRole("button", {name: "Delete"});
    const firstDeleteButton = deleteButtons[0];

    fireEvent.click(firstDeleteButton);

    // Check if the pagination updated
    const pageButtons = screen.getAllByRole("button", {name: /Page \d+/i});
    expect(pageButtons).toHaveLength(2);
  });

  it("renders pagination correctly", () => {
    render(<ItemsList items={mockItems}/>);

    const pageButtons = screen.getAllByRole("button", {name: /Page \d+/i});
    expect(pageButtons).toHaveLength(2); // Should render 2 pages
  });

  it("highlights the active page button", () => {
    render(<ItemsList items={mockItems}/>);

    const pageButtons = screen.getAllByRole("button", {name: /Page \d+/i});
    const firstPageButton = pageButtons[0];

    expect(firstPageButton).toHaveClass("active");
  });
});
