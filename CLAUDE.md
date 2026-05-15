# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## 5. Testing Strategy

**Write tests that verify behavior, not implementation.**

### Unit Tests (Vitest)

- All utility functions must have tests
- State stores are tested by behavior
- Components are tested for key interactions only

### Test Organization

- Component tests: `components/__tests__/`
- State tests: `states/__tests__/`
- Utility tests: `utils/__tests__/`

### Test Commands

- `yarn test` - Run all tests
- `yarn test:watch` - Watch mode
- `yarn test:coverage` - Coverage report
- `yarn test:ui` - UI dashboard

### Testing Guidelines

- New features require tests
- Existing code changes must pass tests
- Run `yarn test` before committing
- Focus on edge cases and error paths

---

## 6. Development Workflow

**Follow a structured approach from design to deployment.**

### Before Coding

1. Define types in `/types` first
2. Write API functions in `/utils`
3. Write tests (TDD recommended)
4. Start implementation

### Component Development

1. **ServerContainer**: Fetch data
2. **ServerBlock**: Server-side rendering
3. **ClientContainer**: State management
4. **ClientBlock**: Client-side rendering

### Quality Checks

- New features → write tests alongside
- Code changes → verify tests pass
- Before push → run `yarn test` and `yarn lint`

### Development Commands

- `yarn dev` - Dev server (HTTPS, Turbopack)
- `yarn build` - Production build
- `yarn start` - Production server
- `yarn lint` - ESLint check

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
