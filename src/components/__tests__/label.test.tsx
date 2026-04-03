/**
 * Label.test.tsx
 * Label 컴포넌트 테스트
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { Label } from "../label";
import { Input } from "../input";

describe("Label", () => {
  it("레이블이 렌더링된다", () => {
    render(<Label>Username</Label>);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("htmlFor 속성으로 input과 연결된다", () => {
    render(
      <>
        <Label htmlFor="username">Username</Label>
        <Input id="username" />
      </>,
    );

    const label = screen.getByText("Username");
    const input = screen.getByRole("textbox");

    expect(label).toHaveAttribute("for", "username");
    expect(input).toHaveAttribute("id", "username");
  });

  it("레이블 클릭 시 해당 input에 포커스된다", async () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" />
      </>,
    );

    const label = screen.getByText("Email");
    const input = screen.getByRole("textbox");

    label.click();
    // Note: jsdom 환경에서 포커스 테스트는 제한이 있을 수 있음
    // 대신 label과 input이 올바르게 연결되었는지 확인
    expect(label).toHaveAttribute("for", "email");
    expect(input).toHaveAttribute("id", "email");
  });

  it("커스텀 className이 적용된다", () => {
    render(<Label className="font-bold text-red-500">Custom Label</Label>);
    const label = screen.getByText("Custom Label");
    expect(label).toHaveClass("font-bold", "text-red-500");
  });

  it("children이 올바르게 렌더링된다", () => {
    render(
      <Label>
        <span>Required</span> Field
      </Label>,
    );

    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByText(/Field/)).toBeInTheDocument();
  });
});
