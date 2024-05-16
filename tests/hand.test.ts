import { describe, expect, it } from "vitest";
import { categorizeHand } from "../src/users/hand";

describe("Hand", () => {
    it("Should categorize a high-card hand", () => {
        const cards = [{id:"A",value:13,symbol:"♠"},{id:"Q",value:11,symbol:"♠"},{id:"T",value:9,symbol:"♥"}]
        const hand = categorizeHand(cards)

        expect(hand.type).toBe("High-Card")
        expect(hand.cards).toBe(cards)
    })
    it("Should categorize a pair hand", () => {
        const cards = [{id:"A",value:13,symbol:"♠"},{id:"Q",value:11,symbol:"♠"},{id:"A",value:13,symbol:"♥"}]
        const hand = categorizeHand(cards)

        expect(hand.type).toBe("Pair")
        expect(hand.rank).toBe("A")
        expect(hand.kicker).toBe("Q")
        expect(hand.cards).toBe(cards)
    })
})