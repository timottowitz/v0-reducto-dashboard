"use client"

import type React from "react"

import { useState, useRef, useEffect, type ReactNode } from "react"

interface WindowProps {
  id: string
  title: string
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  children: ReactNode
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  onMove: (id: string, x: number, y: number) => void
  onResize: (id: string, width: number, height: number) => void
}

export function Window({
  id,
  title,
  x,
  y,
  width,
  height,
  zIndex,
  children,
  onClose,
  onMinimize,
  onFocus,
  onMove,
  onResize,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [previousSize, setPreviousSize] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y
        onMove(id, Math.max(0, newX), Math.max(24, newY))
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y
        const newWidth = Math.max(400, resizeStart.width + deltaX)
        const newHeight = Math.max(300, resizeStart.height + deltaY)
        onResize(id, newWidth, newHeight)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, resizeStart, id, onMove, onResize])

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (isFullscreen) return

    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".window-title")) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - x,
        y: e.clientY - y,
      })
      onFocus()
    }
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isFullscreen) return

    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width,
      height,
    })
    onFocus()
  }

  const handleMaximize = () => {
    if (isFullscreen) {
      // Restore to previous size
      onMove(id, previousSize.x, previousSize.y)
      onResize(id, previousSize.width, previousSize.height)
      setIsFullscreen(false)
    } else {
      // Save current size and go fullscreen
      setPreviousSize({ x, y, width, height })
      onMove(id, 0, 24)
      onResize(id, window.innerWidth, window.innerHeight - 24 - 80)
      setIsFullscreen(true)
    }
  }

  return (
    <div
      ref={windowRef}
      className="absolute overflow-hidden rounded-lg shadow-2xl"
      style={{
        left: x,
        top: y,
        width,
        height,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex h-10 items-center justify-between bg-gray-200 px-3 cursor-move select-none"
        onMouseDown={handleTitleBarMouseDown}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            aria-label="Close"
          />
          <button
            onClick={onMinimize}
            className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            aria-label="Minimize"
          />
          <button
            onClick={handleMaximize}
            className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            aria-label="Maximize"
          />
        </div>
        <div className="window-title flex-1 text-center text-sm font-medium text-gray-700 pointer-events-none">
          {title}
        </div>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="h-[calc(100%-40px)] overflow-hidden bg-white">{children}</div>

      {/* Resize Handle - Hidden when in fullscreen */}
      {!isFullscreen && (
        <div className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize" onMouseDown={handleResizeMouseDown} />
      )}
    </div>
  )
}
