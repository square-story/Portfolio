import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'

import Image from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure>
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={630}
            className="rounded-xl w-full"
          />
          <figcaption className="text-center">{caption}</figcaption>
        </figure>
      )
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    },
    RoundedImage: (props: ComponentPropsWithoutRef<typeof Image>) => {
      return <Image className="rounded-lg border border-zinc-200 dark:border-zinc-800" {...props} />
    },
  }
}
