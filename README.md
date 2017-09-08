# Choose Your Own Adventure Maker

User interface for making choose your own adventure stories. The UI will create a `.str` file which is the choose-your-own-adventure file
format (see below for specification). See [choose-your-own-adventure-parser](https://github.com/dgendill/choose-your-own-adventure-parser) for a JavaScript parser.

[Try it here.](https://dgendill.github.io/choose-your-own-adventure-maker/dist/)

# Todo

- [x] Add controls to remove a story part.
- [ ] Add controls to copy a story part.
- [x] Add menubar
- [x] Add modal code
- [x] Add download button, providing .str format
- [ ] Add download button, providing .json format
- [ ] Embed compiler so stories can be immediately tested in the browser.
- [ ] Allow multiple workspaces and ability to switch between then.

# File Format

### Example
```
Text S365dot13
["Turn Doorknob"] go S365dot14500000000004
["Perform Spin Kick"] go S43538dot395000000004
---
You are in a dark room and can't see anything. You fumble
around in the dark and feel a door handle. Suddenly you
hear a voice behind you say, "You're not going anywhere!"

---next---

Text S365dot14500000000004
["Back to Start"] go S365dot13
---
You turn the doorknob and a flood of light
streams into the room. You start to burn from the light
of the sun.

YOU ARE DEAD

---next---

Text S43538dot395000000004
["Back to Start"] go S365dot13
---
You do a spin kick and attempt to knock whoever is behind you to
the ground! Too bad you were too slow!

YOU ARE DEAD.
```

### Rules
```
1 Notational Conventions and Generic Grammar
1.1 Augmented BNF

    All of the mechanisms specified in this document are described in
    both prose and an augmented Backus-Naur Form (BNF) similar to that
    used by RFC 822 [9].

    *rule
          The character "*" preceding an element indicates repetition. The
          full form is "<n>*<m>element" indicating at least <n> and at most
          <m> occurrences of element. Default values are 0 and infinity so
          that "*(element)" allows any number, including zero; "1*element"
          requires at least one; and "1*2element" allows one or two.

    (rule1 rule2)
          Elements enclosed in parentheses are treated as a single element.
          Thus, "(elem (foo | bar) elem)" allows the token sequences "elem
          foo elem" and "elem bar elem".

1.2 Rules

    qdtext                    = <any TEXT except <">>
    quoted-pair               = "\" CHAR
    quoted-string             = ( <"> *(qdtext | quoted-pair ) <"> )

    partid                    = 1*(ALPHA | DIGIT)
    start                     = "Text " partid
    choice                    = "[" quotedString "] go " partid
    story-part                =  (start CRLF *choice "---" CRLF *TEXT)

    choose-your-own-adventure = story-part *(CRLF "---next---" CRLF story-part)
```

# Install

```
npm install
npm run dev
```

Visit the user interface at localhost:8080.