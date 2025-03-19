const puzzles = [
    {
        name: "Template",
        puzzleDataNested: {
            fullPhrase: '',
            clue: '{{clue_1}}',
            clues: {
                "clue_1": {
                    clue: "example of a {{clue_2}}",
                    answer: "example",
                },
                "clue_2": {
                    clue: "nested clue",
                    answer: "nested",
                },
            }
        }
    },
    {
        name: "March 18, 2025",
        puzzleDataNested: {
            fullPhrase: '“Not all those who wander are lost.” -J.R.R. Tolkien',
            clue: '{{clue_1}} all {{clue_2}}{{clue_3}} who {{clue_8}}{{clue_12}} are {{clue_17}}.',
            clues: {
                "clue_1": {
                    clue: "Ready or ___, here I come",
                    answer: "Not",
                },
                "clue_2": {
                    clue: "Ford model ___ (aka the 'Tin Lizzie')",
                    answer: "t",
                },
                "clue_3": {
                    clue: "flexible {{clue_4}}",
                    answer: "hose",
                },
                "clue_4": {
                    clue: "name for the London {{clue_5}}{{clue_6}}",
                    answer: "tube",
                },
                "clue_5": {
                    clue: "opposite of over",
                    answer: "under",
                },
                "clue_6": {
                    clue: "earth pulverised",
                    answer: "ground",
                },
                "clue_8": {
                    clue: "{{clue_9}}{{clue_10}}'s {{clue_11}}",
                    answer: "wand",
                },
                "clue_9": {
                    clue: "what a witch does",
                    answer: "magic",
                },
                "clue_10": {
                    clue: "The Lord of the Rings actor McKellen",
                    answer: "ian",
                },
                "clue_11": {
                    clue: "hammer, saw, etc.",
                    answer: "tool",
                },
                "clue_12": {
                    clue: "the {{clue_13}}{{clue_14}}{{clue_15}} place in the {{clue_16}}, for short",
                    answer: "er",
                },
                "clue_13": {
                    clue: "word after omni or mini",
                    answer: "bus",
                },
                "clue_14": {
                    clue: "me, myself and ___",
                    answer: "i",
                },
                "clue_15": {
                    clue: "suffix for 'most'",
                    answer: "est",
                },
                "clue_16": {
                    clue: "medical establishment",
                    answer: "hospital",
                },
                "clue_17": {
                    clue: "{{clue_18}} {{clue_19}} drama",
                    answer: "lost",
                },
                "clue_18": {
                    clue: "XYZ counterpart",
                    answer: "ABC",
                },
                "clue_19": {
                    clue: "Greenland is the world's largest one",
                    answer: "island",
                },
            }
        }
    },
    {
        name: "March 19, 2025",
        puzzleDataNested: {
            fullPhrase: "I'm mad as hell and I'm not gonna take it anymore. -Howard Beale",
            clue: "I'm {{clue_1}} as {{clue_2}} and I'm {{clue_3}} gonna {{clue_4}} it {{clue_5}}{{clue_6}}. -Howard Beale",
            clues: {
                "clue_1": {
                    clue: "___ as a hatter",
                    answer: "mad",
                },
                "clue_2": {
                    clue: "{{clue_7}}arus, by another {{clue_8}}",
                    answer: "hell",
                },
                "clue_3": {
                    clue: `"{{clue_10}} it or ___"`,
                    answer: "not",
                },
                "clue_4": {
                    clue: "{{clue_11}} of filming",
                    answer: "take",
                },
                "clue_5": {
                    clue: "{{clue_12}} and {{clue_13}}  preceder",
                    answer: "any",
                },
                "clue_6": {
                    clue: "greedy people's desire",
                    answer: "more",
                },
                "clue_7": {
                    clue: "like {{clue_9}} that aren't sweet",
                    answer: "tart",
                },
                "clue_8": {
                    clue: "first part of many email addresses",
                    answer: "name",
                },
                "clue_9": {
                    clue: "&#127826;&#127826;&#127826;",
                    answer: "cherries",
                },
                "clue_10": {
                    clue: "have faith in",
                    answer: "believe",
                },
                "clue_11": {
                    clue: "memory unit",
                    answer: "bit",
                },
                "clue_12": {
                    clue: "{{clue_14}}'s indication",
                    answer: "time",
                },
                "clue_13": {
                    clue: "come in second",
                    answer: "place",
                },
                "clue_14": {
                    clue: `"What did the ___ do when it was still hungry? Went back four seconds!" (dad joke)`,
                    answer: "clock",
                },
            }
        }
    }
];