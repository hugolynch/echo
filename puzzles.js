const puzzles = [
    {
        name: "Instructions",
        puzzleDataNested: {
            fullPhrase: '',
            clue:
                `
                <strong>Instructions</strong><br />
                <br />
                Can you escape this {{clue_3}} {{clue_4}}!? To do so, you need to solve all the {{clue_2}}. Type your answers in the input box and submit.
                `,
            clues: {
                "clue_1": {
                    clue: "CLUES (<- Try it, type this)",
                    answer: "clues",
                },
                "clue_2": {
                    clue: "NESTED {{clue_1}}",
                    answer: "nested",
                },
                "clue_3": {
                    clue: "ECHO",
                    answer: "echo",
                },
                "clue_4": {
                    clue: "CHAMBER",
                    answer: "chamber",
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
            fullPhrase: "I'm as mad as hell and I'm not gonna take it anymore. -Howard Beale",
            clue: `"I'm as {{clue_1}} as {{clue_2}} and I'm {{clue_3}} gonna {{clue_4}} this {{clue_5}}{{clue_6}}." -Howard Beale`,
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
    },
    {
        name: "March 20, 2025",
        puzzleDataNested: {
            fullPhrase: 'May the Force be with you.',
            clue: '{{clue_1}} the {{clue_2}} be with {{clue_3}}.',
            clues: {
                "clue_1": {
                    clue: "{{clue_4}} {{clue_7}}{{clue_9}} month",
                    answer: "May",
                },
                "clue_2": {
                    clue: "{{clue_10}} {{clue_12}} accelerat{{clue_13}}",
                    answer: "Force",
                },
                "clue_3": {
                    clue: "person {{clue_14}} this {{clue_15}}",
                    answer: "you",
                },
                "clue_4": {
                    clue: "one of the {{clue_5}} {{clue_6}}",
                    answer: "zombie",
                },
                "clue_5": {
                    clue: "breathing",
                    answer: "living",
                },
                "clue_6": {
                    clue: "not breathing",
                    answer: "dead",
                },
                "clue_7": {
                    clue: "in the {{clue_8}}",
                    answer: "aware",
                },
                "clue_8": {
                    clue: "roller coaster feature",
                    answer: "loop",
                },
                "clue_9": {
                    clue: "Loch ___ monster",
                    answer: "ness",
                },
                "clue_10": {
                    clue: "{{clue_11}} service",
                    answer: "mass",
                },
                "clue_11": {
                    clue: "half a weekend",
                    answer: "Sunday",
                },
                "clue_12": {
                    clue: "X, mathwise",
                    answer: "times",
                },
                "clue_13": {
                    clue: "charged particle",
                    answer: "ion",
                },
                "clue_14": {
                    clue: "using Braille, say",
                    answer: "reading",
                },
                "clue_15": {
                    clue: "this is one",
                    answer: "clue",
                },
            }
        }
    },
    {
        name: "March 21, 2025",
        puzzleDataNested: {
            fullPhrase:
                `<strong>"This Is Just to Say"</strong><br />
                <br />
                I have eaten<br />
                the plums<br />
                that were in<br />
                the icebox<br />
                <br />
                and which<br />
                you were probably<br />
                saving<br />
                for breakfast<br />
                <br />
                Forgive me<br />
                they were delicious<br />
                so sweet<br />
                and so cold<br />
                <br />
                -William Carlos Williams`,
            clue:
                `<strong>"This Is Just to Say"</strong><br />
                <br />
                I have {{clue_1}}en<br />
                the {{clue_2}}<br />
                that were in<br />
                the {{clue_3}}{{clue_4}}<br />
                <br />
                and which<br />
                you were probably<br />
                saving<br />
                for {{clue_5}}{{clue_6}}<br />
                <br />
                Forgive me<br />
                they were delicious<br />
                so sweet<br />
                and so {{clue_7}}<br />
                <br />
                -William Carlos Williams<br />
                <br />
                #WorldPoetryDay`,
            clues: {
                "clue_1": {
                    clue: "{{clue_8}} in",
                    answer: "eat",
                },
                "clue_2": {
                    clue: "prunes, {{clue_9}}",
                    answer: "plums",
                },
                "clue_3": {
                    clue: "{{clue_10}} {{clue_11}}",
                    answer: "ice",
                },
                "clue_4": {
                    clue: "{{clue_12}} it out",
                    answer: "box",
                },
                "clue_5": {
                    clue: "un{{clue_13}} thing for a mirror to do",
                    answer: "break",
                },
                "clue_6": {
                    clue: "2 ___ 2 {{clue_14}}",
                    answer: "fast",
                },
                "clue_7": {
                    clue: "like an abandoned {{clue_15}}",
                    answer: "cold",
                },
                "clue_8": {
                    clue: "archaeological site",
                    answer: "dig",
                },
                "clue_9": {
                    clue: "a single time",
                    answer: "once",
                },
                "clue_10": {
                    clue: "2013 film with a talking {{clue_16}}{{clue_17}}",
                    answer: "frozen",
                },
                "clue_11": {
                    clue: "H<sub>2</sub>0",
                    answer: "water",
                },
                "clue_12": {
                    clue: "home of the Blue Devils",
                    answer: "duke",
                },
                "clue_13": {
                    clue: "like a {{clue_18}}-leaf clover",
                    answer: "lucky",
                },
                "clue_14": {
                    clue: "enraged",
                    answer: "furious",
                },
                "clue_15": {
                    clue: "phone protector",
                    answer: "case",
                },
                "clue_16": {
                    clue: "winter forecast",
                    answer: "snow",
                },
                "clue_17": {
                    clue: "fellow",
                    answer: "man",
                },
                "clue_18": {
                    clue: "horsemen count",
                    answer: "four",
                },
            }
        }
    }
];