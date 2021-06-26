const FARM = [{
    pid: 0,
    lpSymbol: 'FINIX',
    lpAddresses: "0xd51c337147c8033a43f3b5ce0023382320c113aa",
    lpDecimals: 18,
    tokenSymbol: ['FINIX'],
    tokenAddresses: [
      "0xd51c337147c8033a43f3b5ce0023382320c113aa"
    ],
    tokenDecimals: [18]
  },
  {
    pid: 1,
    lpSymbol: 'SIX',
    lpAddresses: "0xef82b1c6a550e730d8283e1edd4977cd01faf435",
    lpDecimals: 18,
    tokenSymbol: ['SIX'],
    tokenAddresses: [
      "0xef82b1c6a550e730d8283e1edd4977cd01faf435"
    ],
    tokenDecimals: [18]
  },
  {
    pid: 2,
    lpSymbol: 'FINIX-SIX LP',
    lpAddresses: "0x36c53ecbd87d105e8d2d71984ce4eb4f3f341402",
    lpDecimals: 18,
    tokenSymbol: ['FINIX', 'SIX'],
    tokenAddresses: [
      "0xd51c337147c8033a43f3b5ce0023382320c113aa", 
      "0xef82b1c6a550e730d8283e1edd4977cd01faf435"
    ],
    tokenDecimals: [18, 18]

  },
  {
    pid: 3,
    lpSymbol: 'FINIX-KLAY LP',
    lpAddresses: "0x8fd25bb623a988e52c65f68a68e8780014f0892d",
    lpDecimals: 18,
    tokenSymbol: ['FINIX', 'WKLAY'],
    tokenAddresses: [
      "0xd51c337147c8033a43f3b5ce0023382320c113aa",
      "0x5819b6af194a78511c79c85ea68d2377a7e9335f"
    ],
    tokenDecimals: [18, 18]
  },
  {
    pid: 4,
    lpSymbol: 'FINIX-KSP LP',
    lpAddresses: "0x0754be11a1a1a58358b70441142643981e47d796",
    lpDecimals: 18,
    tokenSymbol: ['FINIX', 'KSP'],
    tokenAddresses: [
      "0xd51c337147c8033a43f3b5ce0023382320c113aa",
      "0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654"
    ],
    tokenDecimals: [18, 18]
  },
  {
    pid: 5,
    lpSymbol: 'FINIX-KUSDT LP',
    lpAddresses: "0x3737811657e9d3e9638144411307838cbce13775",
    lpDecimals: 18,
    tokenSymbol: ['FINIX', 'KUSDT'],
    tokenAddresses: [
      "0xd51c337147c8033a43f3b5ce0023382320c113aa",
      "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"
    ],
    tokenDecimals: [18, 6]
  },
  {
    pid: 6,
    lpSymbol: 'SIX-KUSDT LP',
    lpAddresses: "0x7433d3f86d9ae8d8989bac87c2a1c06d29121d35",
    lpDecimals: 18,
    tokenSymbol: ['SIX', "KUSDT"],
    tokenAddresses: [
      "0xef82b1c6a550e730d8283e1edd4977cd01faf435",
      "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"
    ],
    tokenDecimals: [18, 6]
  },
  {
    pid: 7,
    lpSymbol: 'SIX-KLAY LP',
    lpAddresses: "0x92f204c1d9d31a70e40a50d744ff0aa3b2600fd9",
    lpDecimals: 18,
    tokenSymbol: ['SIX', 'WKLAY'],
    tokenAddresses: [
      "0xef82b1c6a550e730d8283e1edd4977cd01faf435",
      "0x5819b6af194a78511c79c85ea68d2377a7e9335f"
    ],
    tokenDecimals: [18, 18]
  },
  {
    pid: 8,
    lpSymbol: 'KLAY-KETH LP',
    lpAddresses: "0xf33db5d2e5d5d628462f6eaca906ddcd16073e69",
    lpDecimals: 18,
    tokenSymbol: ['WKLAY', 'KETH'],
    tokenAddresses: [
      "0x5819b6af194a78511c79c85ea68d2377a7e9335f",
      "0x34d21b1e550d73cee41151c77f3c73359527a396"
    ],
    tokenDecimals: [18, 18]
  },
  {
    pid: 9,
    lpSymbol: 'KLAY-KBTC LP',
    lpAddresses: "0x84cd5b54daa59e7ae5a9d45f630ce690292fc4c1",
    lpDecimals: 18,
    tokenSymbol: ['WKLAY', 'KWBTC'],
    tokenAddresses: [
      "0x5819b6af194a78511c79c85ea68d2377a7e9335f",
      "0x16d0e1fbd024c600ca0380a4c5d57ee7a2ecbf9c"
    ],
    tokenDecimals: [18, 8]
  },
  {
    pid: 10,
    lpSymbol: 'KLAY-KXRP LP',
    lpAddresses: "0xd16b4b651c8a6a58086a1449ef852fdf38922047",
    lpDecimals: 18,
    tokenSymbol: ['WKLAY', 'KXRP'],
    tokenAddresses: [
      "0x5819b6af194a78511c79c85ea68d2377a7e9335f",
      "0x9eaefb09fe4aabfbe6b1ca316a3c36afc83a393f"
    ],
    tokenDecimals: [18, 6]
  },
  {
    pid: 11,
    lpSymbol: 'KETH-KUSDT LP',
    lpAddresses: "0x925bb55693857f33fe2df12e7db6cfe63c308533",
    lpDecimals: 18,
    tokenSymbol: ['KETH', 'KUSDT'],
    tokenAddresses: [
      "0x34d21b1e550d73cee41151c77f3c73359527a396",
      "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"
    ],
    tokenDecimals: [18, 18]
  },
  {
    pid: 12,
    lpSymbol: 'KBTC-KUSDT LP',
    lpAddresses: "0xd7e66f34d76779396ed62e0f097be4a82d2f4b57",
    lpDecimals: 18,
    tokenSymbol: ['WKBTC', 'KUSDT'],
    tokenAddresses: [
      "0x16d0e1fbd024c600ca0380a4c5d57ee7a2ecbf9c",
      "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"
    ],
    tokenDecimals: [8, 6]
  },
  {
    pid: 13,
    lpSymbol: 'KXRP-KUSDT LP',
    lpAddresses: "0x4cac28fbce94a011c6edded62aa91cda4eb2bc3f",
    lpDecimals: 18,
    tokenSymbol: ['KXRP', 'KUSDT'],
    tokenAddresses: [
      "0x9eaefb09fe4aabfbe6b1ca316a3c36afc83a393f",
      "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"
    ],
    tokenDecimals: [6, 6]
  },
  {
    pid: 14,
    lpSymbol: 'KLAY-KUSDT LP',
    lpAddresses: "0xcccd396490e84823ad17ab9781476a17150ad8e2",
    lpDecimals: 18,
    tokenSymbol: ['WKLAY', 'KUSDT'],
    tokenAddresses: [
      "0x5819b6af194a78511c79c85ea68d2377a7e9335f",
      "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"
    ],
    tokenDecimals: [18, 6]
  },
  {
    pid: 15,
    lpSymbol: 'KDAI-KUSDT LP',
    lpAddresses: "0x12fd4576abc462a1fbbd933a7af3d4895517baf2",
    lpDecimals: 18,
    tokenSymbol: ['KDAI', 'KUSDT'],
    tokenAddresses: [
      "0x5c74070fdea071359b86082bd9f9b3deaafbe32b",
      "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"
    ],
    tokenDecimals: [18, 6]
  },
  {
    pid: 16,
    lpSymbol: 'KBNB-KUSDT LP',
    lpAddresses: "0x10592d608aeb69ded0c792127526e25d2b171185",
    lpDecimals: 18,
    tokenSymbol: ['KBNB', 'KUSDT'],
    tokenAddresses: [
      "0x574e9c26bda8b95d7329505b4657103710eb32ea",
      "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"
    ],
    tokenDecimals: [18, 6]
  },
  {
    pid: 17,
    lpSymbol: 'KBNB-FINIX LP',
    lpAddresses: "0x85234cf8fac4d5e03a553d766c64901b811a31e4",
    lpDecimals: 18,
    tokenSymbol: ['KBNB', 'FINIX'],
    tokenAddresses: [
      "0x574e9c26bda8b95d7329505b4657103710eb32ea",
      "0xd51c337147c8033a43f3b5ce0023382320c113aa"
    ],
    tokenDecimals: [18, 18]
  }
]

module.exports = {
  FARM
}