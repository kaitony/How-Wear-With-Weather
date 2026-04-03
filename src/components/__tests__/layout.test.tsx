/**
 * Layout.test.tsx
 * Layout 컴포넌트 테스트
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../layout";

describe("Layout", () => {
  it("레이아웃이 렌더링된다", () => {
    render(<Layout>Test Content</Layout>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("자식 요소가 올바르게 렌더링된다", () => {
    render(
      <Layout>
        <div>Child 1</div>
        <div>Child 2</div>
      </Layout>,
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("그라데이션 배경 클래스가 적용된다", () => {
    const { container } = render(<Layout>Content</Layout>);
    const layoutDiv = container.firstChild;

    expect(layoutDiv).toHaveClass("bg-linear-to-br");
    expect(layoutDiv).toHaveClass("from-blue-100");
    expect(layoutDiv).toHaveClass("via-purple-50");
    expect(layoutDiv).toHaveClass("to-yellow-100");
  });

  it("복잡한 중첩 구조도 렌더링된다", () => {
    render(
      <Layout>
        <header>Header</header>
        <main>
          <section>Section Content</section>
        </main>
        <footer>Footer</footer>
      </Layout>,
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Section Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
