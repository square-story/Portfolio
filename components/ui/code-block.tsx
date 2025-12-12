'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useCopyToClipboard } from '@uidotdev/usehooks'

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    children?: React.ReactNode
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    const [isCopied, copyToClipboard] = useCopyToClipboard()
    const hasCopiedText = Boolean(isCopied);
    const getText = (node: React.ReactNode): string => {
        if (typeof node === 'string' || typeof node === 'number') {
            return String(node)
        }
        if (Array.isArray(node)) {
            return node.map(getText).join('')
        }
        if (typeof node === 'object' && node && 'props' in node) {
            // @ts-ignore - inspecting children safely
            return getText((node as React.ReactElement).props.children)
        }
        return ''
    }
    return (
        <div className="relative group overflow-hidden">
            <button
                onClick={() => copyToClipboard(getText(children))}
                disabled={hasCopiedText}
                className="absolute right-2 top-8 z-10 rounded-md p-1.5 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Copy code"
            >
                {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
            </button>
            <pre
                className={`overflow-x-auto p-4 text-sm ${className || ''}`}
                {...props}
            >
                {children}
            </pre>
        </div>
    )
}
