'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    children?: React.ReactNode
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = async () => {
        // Extract text content from children
        let textToCopy = ''

        // Helper to safely get text from React nodes
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

        // Try to find the inner <code> element which usually contains the text
        if (typeof children === 'object' && children !== null && 'props' in children) {
            const codeElement = children as React.ReactElement
            if (codeElement.type === 'code') {
                textToCopy = getText((codeElement.props as { children: React.ReactNode }).children)
            } else {
                textToCopy = getText(children)
            }
        } else {
            textToCopy = getText(children)
        }

        if (textToCopy) {
            await navigator.clipboard.writeText(textToCopy)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        }
    }

    return (
        <div className="relative group overflow-hidden">
            <button
                onClick={copyToClipboard}
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
