import { config, fields, collection, singleton } from '@keystatic/core';

// Drawings shipped with the site (src/figures/*.svg). A project uses its photo when one is
// uploaded, otherwise this drawing.
const figureOptions = [
  { label: 'None', value: 'none' },
  { label: 'Robot arm sorting cubes', value: 'arm' },
  { label: 'Hexapod gait', value: 'hexapod' },
  { label: 'Quadruped following a person', value: 'unitree' },
  { label: 'Rocket landing', value: 'rocket' },
  { label: 'Biped inverted pendulum', value: 'biped' },
  { label: 'Parallel RL environments', value: 'rl' },
  { label: 'Rover steering', value: 'rover' },
  { label: 'Engine idle speed', value: 'idle' },
  { label: 'Planner tree', value: 'rrt' },
  { label: 'Plasma thrusters', value: 'plasma' },
  { label: 'Pegasus wing linkage', value: 'pegasus' },
  { label: 'Domino path', value: 'domino' },
  { label: 'Sudoku', value: 'sudoku' },
] as const;

const iconOptions = [
  { label: 'Light bulb', value: 'bulb' },
  { label: 'Rover', value: 'rover' },
  { label: 'Graduation cap', value: 'cap' },
  { label: 'Lab flask', value: 'flask' },
  { label: 'Globe', value: 'globe' },
  { label: 'Network', value: 'network' },
  { label: 'Sliders', value: 'sliders' },
  { label: 'Linkage', value: 'linkage' },
  { label: 'Code', value: 'code' },
  { label: 'Cube', value: 'cube' },
  { label: 'Sigma', value: 'sigma' },
] as const;

const textList = (label: string, itemLabel: string) =>
  fields.array(fields.text({ label: itemLabel }), { label, itemLabel: (p) => p.value || itemLabel });

const projectLinks = (label: string) =>
  fields.array(fields.relationship({ label: 'Project', collection: 'projects' }), {
    label,
    itemLabel: (p) => p.value ?? 'Project',
  });

export default config({
  // Local mode when you run `npm run dev`; GitHub mode on the live site, so every save is a commit.
  // Set PUBLIC_KEYSTATIC_GITHUB=true locally once to run the GitHub App setup (see README).
  storage:
    import.meta.env?.PROD || import.meta.env?.PUBLIC_KEYSTATIC_GITHUB === 'true'
      ? { kind: 'github', repo: 'kenzy357/portfolio' }
      : { kind: 'local' },
  ui: {
    brand: { name: 'Kenzy · Portfolio' },
    navigation: {
      Page: ['site', 'career', 'skills'],
      Projects: ['projects'],
    },
  },

  singletons: {
    site: singleton({
      label: 'Intro & contact',
      path: 'src/content/site',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({ label: 'Name' }),
        eyebrow: fields.text({ label: 'Line above the name' }),
        intro: fields.text({ label: 'Intro paragraph', multiline: true }),
        currently: fields.text({ label: '"Currently" note', multiline: true }),
        photo: fields.image({ label: 'Photo', directory: 'public/images', publicPath: '/images/' }),
        photoCaption: fields.text({ label: 'Photo caption' }),
        email: fields.text({ label: 'Email' }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        location: fields.text({ label: 'Location' }),
        stats: fields.array(
          fields.object({ value: fields.text({ label: 'Number or highlight' }), label: fields.text({ label: 'Label' }) }),
          { label: 'Stats under the buttons', itemLabel: (p) => `${p.fields.value.value} ${p.fields.label.value}` }
        ),
        contactTitle: fields.text({ label: 'Contact heading' }),
        contactText: fields.text({ label: 'Contact text', multiline: true }),
      },
    }),

    career: singleton({
      label: 'Career & education',
      path: 'src/content/career',
      format: { data: 'yaml' },
      schema: {
        entries: fields.array(
          fields.object({
            kind: fields.select({
              label: 'Type',
              options: [
                { label: 'Experience', value: 'experience' },
                { label: 'Education', value: 'education' },
              ],
              defaultValue: 'experience',
            }),
            icon: fields.select({ label: 'Icon', options: iconOptions as any, defaultValue: 'bulb' }),
            dates: fields.text({ label: 'Dates', description: 'e.g. Sep 2025 – now' }),
            current: fields.checkbox({ label: 'Current (shows a dot)' }),
            title: fields.text({ label: 'Title' }),
            org: fields.text({ label: 'Organisation / place' }),
            award: fields.text({ label: 'Highlight badge (optional)' }),
            description: fields.text({ label: 'Description (optional)', multiline: true }),
            bullets: textList('Bullet points', 'Bullet'),
            chipsLabel: fields.text({ label: 'Tag list heading', description: 'e.g. Relevant courses' }),
            chips: textList('Tags', 'Tag'),
            projects: projectLinks('Linked projects'),
          }),
          { label: 'Entries (top = most recent)', itemLabel: (p) => `${p.fields.dates.value} · ${p.fields.title.value}` }
        ),
      },
    }),

    skills: singleton({
      label: 'Skills',
      path: 'src/content/skills',
      format: { data: 'yaml' },
      schema: {
        intro: fields.text({ label: 'Intro line' }),
        groups: fields.array(
          fields.object({
            icon: fields.select({ label: 'Icon', options: iconOptions as any, defaultValue: 'code' }),
            title: fields.text({ label: 'Title' }),
            tagline: fields.text({ label: 'Tagline' }),
            tools: textList('Tools & topics', 'Tool'),
            usedIn: projectLinks('Used in projects'),
          }),
          { label: 'Skill cards', itemLabel: (p) => p.fields.title.value }
        ),
      },
    }),
  },

  collections: {
    projects: collection({
      label: 'Projects',
      path: 'src/content/projects/*',
      slugField: 'title',
      format: { data: 'yaml' },
      columns: ['code', 'order'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        code: fields.text({ label: 'Code', description: 'Shown on the card, e.g. P-14' }),
        order: fields.integer({ label: 'Order on the page', description: 'Lower numbers come first', defaultValue: 99 }),
        place: fields.text({ label: 'Where', description: 'e.g. ETH Zurich' }),
        status: fields.text({ label: 'Status label', description: 'e.g. Real robot, Simulation' }),
        realHardware: fields.checkbox({ label: 'Ran on real hardware (red dot)' }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        bullets: textList('Details (shown when expanded)', 'Bullet'),
        tools: textList('Tools', 'Tool'),
        image: fields.image({
          label: 'Photo (optional)',
          description: 'Replaces the drawing when set',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
        }),
        figure: fields.select({ label: 'Drawing', options: figureOptions as any, defaultValue: 'none' }),
        link: fields.url({ label: 'Link (optional)', description: 'GitHub, video or write-up' }),
      },
    }),
  },
});
