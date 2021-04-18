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
