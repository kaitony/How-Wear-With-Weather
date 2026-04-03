/**
 * Spinner.test.tsx
 * Spinner 컴포넌트 테스트
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { Spinner } from "../spinner";

describe("Spinner", () => {
  it("스피너가 렌더링된다", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute("aria-label", "Loading");
  });

  it("회전 애니메이션 클래스가 적용된다", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("animate-spin");
  });

  it("커스텀 className이 적용된다", () => {
    render(<Spinner className="text-red-500 size-20" />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("text-red-500", "size-20", "animate-spin");
  });

  it("기본 크기는 size-4이다", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("size-4");
  });
});
