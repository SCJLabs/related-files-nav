export interface Rule {
  label: string,
  pattern: string,
  sortOrder: number,
}

export const rules: Rule[] = [
  {
    label: 'Related: Component Route',
    pattern: '/app/components/routes',
    sortOrder: 2,
  },
  {
    label: 'Related: Component',
    pattern: '/app/components/',
    sortOrder: 1,
  },
  {
    label: 'Related: Route',
    pattern: '/app/routes/',
    sortOrder: 3,
  },
  {
    label: 'Related: Controller',
    pattern: '/app/controllers/',
    sortOrder: 3,
  },
  {
    label: 'Related: Template',
    pattern: '/app/templates/',
    sortOrder: 4,
  },
  {
    label: 'Related: Tests - Unit',
    pattern: '/tests/unit',
    sortOrder: 5,
  },
  {
    label: 'Related: Tests - Integration',
    pattern: '/tests/integration',
    sortOrder: 5,
  },
  {
    label: 'Related: Tests - Acceptance',
    pattern: '/tests/acceptance',
    sortOrder: 5,
  },
]