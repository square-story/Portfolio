import { ProjectShowcase } from "@/components/ui/project-showcase";

export const metadata = {
    title: 'Work',
    description: 'Selected project case studies by Mohammed Sadik.',
}

export default function WorkPage() {
    return (
        <section className="mx-auto w-full">
            <ProjectShowcase />
        </section>
    )
}
