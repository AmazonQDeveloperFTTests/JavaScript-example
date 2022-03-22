/**
 * A LinkedList based solution for Add Two Numbers
 *
 */
import { Node } from './SinglyLinkedList.js'

/*
Problem Statement:
Given two non-empty linked lists representing two non-negative integers.
The digits are stored in reverse order and each of their nodes contain a single digit.
Add the two numbers and return it as a linked list.

Link for the Problem: https://leetcode.com/problems/add-two-numbers/
*/

class AddTwoNumbers {
  constructor () {
    this.dummyNode = new Node(0)
  }

  solution (firstList, secondList) {
    let firstRunner = firstList
    let secondRunner = secondList
    let tail = this.dummyNode
    let carry = 0
    // Initializing variables

    while (firstRunner != null || secondRunner != null) {
      const firstNumber = firstRunner ? firstRunner.data : 0
      const secondNumber = secondRunner ? secondRunner.data : 0
      // Storing values of firstRunner and secondRunner if they exist, 
      // else storing 0, allowing us to take the sum in the next line

      const sum = carry + firstNumber + secondNumber
      carry = parseInt(sum / 10)
      tail.next = new Node(sum % 10)
      tail = tail.next

      // Storing the carry and creating the node for the next digit
      if (firstRunner) {
        firstRunner = firstRunner.next
      }
      if (secondRunner) {
        secondRunner = secondRunner.next
      }
    }
    if (carry > 0) {
      tail.next = new Node(carry % 10)
      // Creating the node for the last carry after adding all digits 
    }

    return this.dummyNode.next
  }

  solutionToArray () {
    const list = []
    let currentNode = this.dummyNode.next
    while (currentNode) {
      list.push(currentNode.data)
      currentNode = currentNode.next
    }

    return list
  }
}

export { AddTwoNumbers }
