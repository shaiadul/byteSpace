<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN: shadcn ui rules -->

# shadcn/ui Guidelines & Component Rules

- **Always Use shadcn/ui Components**:
  - Always prefer and use shadcn/ui components located in `@/components/ui/` instead of raw HTML elements (e.g., use `<Button>` instead of `<button>`, `<Input>` instead of `<input>`, `<Badge>`, `<Card>`, `<Dialog>`, `<Tooltip>`, etc.).
  - Do not create custom duplicate components when a shadcn/ui component already exists in `components/ui/`.

- **Utilize Variants & Sizes**:
  - Always utilize component variants and sizes via props (`variant="..."`, `size="..."`) rather than hardcoding arbitrary inline Tailwind overrides.
  - For `<Button>`:
    - Supported variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`.
    - Supported sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`.
    - Use `variant="outline"` when bordered or secondary actions are needed.
    - Use `variant="link"` when link-style actions are needed.
    - Use `variant="ghost"` for subtle/icon actions.
  - If a new variant or visual style is needed, extend `buttonVariants` via `cva()` inside `components/ui/button.tsx` or compose it cleanly with `cn(buttonVariants({ variant: "..." }), className)`.

- **Imports & Aliases**:
  - Always import components using the `@/components/ui/...` path alias.
  - Always import icons using `@tabler/icons-react`.
  - Wrap components requiring context providers (such as `<TooltipProvider>`) in root/layout components.

<!-- END: shadcn ui rules -->
