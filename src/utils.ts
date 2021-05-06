import _ from "lodash/fp"

export interface TreeNode<arrayNode = number> {
  val?: arrayNode
  left?: TreeNode<arrayNode>
  right?: TreeNode<arrayNode>
}

export const toTree = <arrayNode>(array: arrayNode[]): TreeNode<arrayNode> => {
  const head: TreeNode<arrayNode> = { val: array[0] }
  const qp = [head]
  let ci = 0

  while (ci < array.length) {
    const root = qp.shift()
    if (root) {
      if (!_.isNil(array[++ci])) {
        root.left = { val: array[ci] }
      }
      if (!_.isNil(array[++ci])) {
        root.right = { val: array[ci] }
      }
      if (ci < array.length) {
        qp.push(root.left)
        qp.push(root.right)
      }
    }
  }

  return head
}

export interface ListNode<arrayNode = number> {
  val: arrayNode
  next?: ListNode
}

export const toLL = <arrayNode>(array: arrayNode[]): ListNode<arrayNode> => {
  const root = { val: null, next: null }
  let cur = root
  for (let i = 0; i < array.length; i++) {
    cur.next = { val: array[i] }
    cur = cur.next
  }
  return root.next
}

export const toArray = (
  root: ListNode<number | string>
): number[] | string[] => {
  if (!root) return []
  const res = []
  while (root) {
    res.push(root.val)
    root = root.next
  }
  return res
}

export class Heap<HeapNode = number> {
  heapArray: HeapNode[]
  constructor() {
    this.heapArray = []
  }

  compare(val1: number, val2: number): boolean {
    return this.heapArray[val1] > this.heapArray[val2]
  }

  trickleDown(i = 0): void {
    const { heapArray } = this
    const leftIndex = i * 2 + 1
    const rightIndex = i * 2 + 2
    let focus = i
    if (leftIndex < heapArray.length && this.compare(leftIndex, focus))
      focus = leftIndex
    if (rightIndex < heapArray.length && this.compare(rightIndex, focus))
      focus = rightIndex

    if (focus !== i) {
      this.swap(i, focus)
      this.trickleDown(focus)
    }
  }

  bubbleUp(i: number): void {
    const parent = Math.floor((i - 1) / 2)
    if (parent >= 0 && this.compare(i, parent)) {
      this.swap(i, parent)
      this.bubbleUp(parent)
    }
  }

  add(node: HeapNode): void {
    this.heapArray.push(node)
    this.bubbleUp(this.heapArray.length - 1)
  }

  swap(i: number, j: number): void {
    ;[this.heapArray[i], this.heapArray[j]] = [
      this.heapArray[j],
      this.heapArray[i],
    ]
  }

  peak(): HeapNode {
    return this.heapArray?.[0]
  }

  pop(): HeapNode {
    const { heapArray } = this
    this.swap(0, heapArray.length - 1)
    const first = this.heapArray.pop()
    this.trickleDown()
    return first
  }
}
