import { ProjectShowcase } from "@/components/ui/project-showcase";

export const metadata = {
    title: 'Work',
    description: 'Selected work and projects.',
}

export default function WorkPage() {
    return (
        <section className="mx-auto w-full">
            <ProjectShowcase />
        </section>
    )
}
