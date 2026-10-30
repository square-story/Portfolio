import { ProjectShowcase } from "@/components/ui/project-showcase";

export const metadata = {
    title: 'Work',
    description: 'Selected projects and case studies by Mohammed Sadik.',
}

export default function WorkPage() {
    return (
        <section className="mx-auto w-full">
            <ProjectShowcase />
        </section>
    )
}
