1| # Copilot Workspace: Overview
2| 
3| [Copilot Workspace](https://githubnext.com/projects/copilot-workspace/) is a _task-centric_ AI assistant. Each day as a developer you start with a task, and make the journey to explore, understand,[...]
4| 
5| Copilot Workspace is built on a set of principles that guide its design and development:
6| 
7| * Copilot Workspace is _contextual_. It is deeply integrated with GitHub, and is aware of the context of your task — the repository, the issue, the pull request.
8| 
9| * Copilot Workspace is _assistive_. It offers a canvas for you to navigate unfamiliar tasks, augmenting your development skills with a new kind of AI assistance.
10| 
11| * Copilot Workspace is _pervasive_. It is ready and waiting for you, available on every issue in every enabled repository on GitHub. And Copilot Workspace is even there for you when starting new c[...]
12| 
13| * Copilot Workspace is _iterative_. Copilot Workspace encourages you to check, review, refine and iterate on AI-generated outputs. You, the developer, are in control.
14| 
15| * Copilot Workspace is _collaborative_. You can share sessions with your team and publish links to your sessions on issues and pull requests. And, if you're a repository maintainer, we give you co[...]
16| 
17| * Copilot Workspace is _configurable_. You can integrate Copilot Workspace into your workflows via deep links to Copilot Workspace that specify common tasks.
18| 
19| In this manual, we will guide you through the concepts and features of Copilot Workspace, and help you get started with using it effectively.
20| 
21| <img src="images/overview/session.png" width="600" alt="A fully-implemented workspace session">
22| 
23| *A fully-implemented workspace session*
24| 
25| ## Features
26| 
27| 1. [Task](#task)
28| 1. [Specification](#specification)
29| 1. [Plan](#plan)
30| 1. [Implementation](#implementation)
31| 1. [Iterating on Files](#iterating-on-files)
32| 1. [Integrated Terminal](#integrated-terminal)
33| 1. [Session Sharing](#session-sharing)
34| 1. [Task Completion](#task-completion)
35| 1. [Session Dashboard](#session-dashboard)
36| 
37| ## Task
38| 
39| Everything in Copilot Workspace begins with a “task”, which is a natural language description of intent. The task always has a context: a GitHub repository.
40| For this technical preview, Copilot Workspace supports four types of tasks: solving issues, refining pull requests, [creating repositories from templates](creating-repos.md) and ad-hoc tasks. Here[...]
41| 
42| Once enrolled in the technical preview, then on every issue in GitHub you will find a new "Open in Workspace" button:
43| 
44| <img src="images/general/open-in-workspace.png" width=400 alt="Button on issue page to open in Copilot Workspace">
45| 
46| *Open an issue in Copilot Workspace*
47| 
48| This will open Copilot Workspace contextualized to this issue. For issue tasks, the task is based in the title and body of the issue, plus the issue’s comment thread. Copilot Workspace will imme[...]
49| 
50| <img src="images/overview/issue-timeline-representation.png" width=600 alt="Issue task timeline representation">
51| 
52| *The task is labeled as “Issue” and analysis begins*
53| 
54| ## Specification
55| 
56| In order to help summarize a non-trivial task definition (e.g. an issue with a long comment thread), Copilot Workspace first generates a “topic” for the task, which takes the form of a questio[...]
57| 
58| <img src="images/overview/topic-question.png" width=600 alt="Topic question">
59| 
60| *Note how the topic introduces clarity that is completely missing from the issue title*
61| 
62| You can think of the topic as a way to distill the task down to its essence, and to give you an early and fast opportunity to see if Copilot Workspace is on the right track. If the topic is wrong,[...]
63| 
64| After producing the topic, Copilot Workspace generates a bulleted list describing the current behavior of the codebase, based on the task and topic being posed. This helps build your confidence th[...]
65| 
66| <img src="images/overview/current-spec.png" width=600 alt="Current specification">
67| 
68| *The current specification answers the question in the topic based on the current state*
69| 
70| And if Copilot Workspace gets anything wrong, then you can easily edit/delete steps from the current spec, or even choose to regenerate an entirely new spec (“try again”). In practice, we find[...]
71| 
72| After the current specification, Copilot Workspace generates a “proposed specification”, which is a bulleted list which articulates the state that the codebase would be in after resolving the [...] 
73| 
74| <img src="images/overview/proposed-spec.png" width=600 alt="Proposed specification">
75| 
76| *The proposed specification indicates how to edit the codebase in order to solve the task*
77| 
78| ## Content Selection
79| 
80| To generate the current and proposed specifications, and for all following steps, Copilot Workspace needs to identify which files in the codebase are relevant to understanding and completing the t[...]
81| 
82| Users may review the files selected by Copilot Workspace using the "View references" button in the Specification panel. To adjust which files are selected, users can edit the task and use natural [...] 
83| 
84| <img src="images/overview/references.png" width=600 alt="Show references dialog">
85| 
86| *The references that the model used to generate the original and modified specifications*
87| 
88| ## Plan
89| 
90| Once you are happy with the current and proposed specs, you can request Copilot Workspace to generate a plan, which is a list of the files that need to be modified (e.g. edited, created, deleted, [...] 
91| 
92| Like the spec, the plan is fully editable and regeneratable, which allows you to refine and steer Copilot Workspace in the right direction.
93| 
94| <img src="images/overview/plan.png" width=600 alt="Plan">
95| 
96| *A plan, showing the steps needed to edit one file and add a second one*
97| 
98| ## Implementation
99| 
100| When you are happy with the plan, you can click the “Implement” button in order to begin implementing it. This will update the UI to display a series of queued file updates on the right side,[...]
101| 
102| Once a file is implemented, Copilot Workspace renders a diff view for it, and automatically scrolls to the first change. The diff editors are editable, which allows making minor tweaks directly t[...]
103| 
104| ## Iterating on Files
105| 
106| Copilot Workspace doesn't always get everything right, and so it makes it easy for users to iterate on the implementations file by file. Simply add, remove, edit the items in the plan steps for e[...] 
107| 
108| For example, you can edit the diff directly, or you can go back to the plan and make changes there. And if you need to make more extensive changes, you can regenerate the plan entirely.
109| 
110| <img src="images/overview/file-iteration.png" width=600 alt="Plan panel with file iteration">
111| 
112| *The plan panel enables users to iterate on implementation file by file*
113| 
114| ## Integrated Terminal
115| 
116| Once you have implemented the plan, Copilot Workspace enables you to validate the changes for correctness by bringing up an integrated terminal and executing shell commands. This allows performin[...]
117| 
118| <img src="images/overview/terminal.png" width=600 alt="Integrated terminal">
119| 
120| *Integrated terminal, showing the generated branch name and access to just-in-time compute*
121| 
122| If you want to make any more extensive changes or leverage rich editor features (e.g. step debugging), you can open the Copilot Workspace session in a Codespace, using any of Codespace’s suppor[...]
123| 
124| ## Session Sharing
125| 
126| In order to make it easy to share a workspace session with others (e.g. for doing an ad-hoc code review or sharing an initial implementation idea), Copilot Workspace allows users to generate shar[...] 
127| 
128| Shared sessions are copies of the original session. Non-guest users can use them as a starting point to continue the task or explore alternative solutions without interfering with the original se[...] 
129| 
130| <img src="images/overview/share-link.png" width=600 alt="Generating a share link">
131| 
132| *Generating a share link from the header bar*
133| 
134| When working with issues and pull requests, you can also
135| 
136| * Publish to issue comment. Copilot Workspace automatically generates a comment with a share link for the session, which is included in the issue. This allows reviewers to quickly access the work[...]
137| 
136| * Publish to pull request comment. Similar to the issue comment, Copilot Workspace automatically generates a comment with a share link for the session, which is included in the pull request. This[...] 
140| ## Task Completion
141| 
142| When a task is implemented, validated, and reviewed, you can complete the task in different ways, depending on the type of task you’re working on.
143| 
144| <img src="images/overview/task-completion.png" width=600 alt="Creating a pull request">
145| 
146| *Creating a pull request for the implemented changes*
147| 
148| | Task type | Available completions | 
149| |-----------| -------------------- |
150| | Issue | — Create pull request <br> — Create draft pull request <br> — Push to new branch <br> — Push changes to current branch (only available if you have commit permissions to the repo[...]
151| | Ad-hoc task | — *As for issues* |
152| | PR task | — Update pull request (pushes a new commit with the changes) <br> — *As for issues* |
153| | Repo task | — Create repository (creates a new repo from the selected template repo, and includes the changes) |
154| 
155| ## Session Dashboard
156| 
157| Copilot Workspace automatically saves your work. It also provides a session dashboard, which allows you to easily resume your work later. You can start a task from your phone and then finish up o[...] 
158| 
159| <img src="images/general/dashboard.png" width=600 alt="Copilot Workspace dashboard">
160| 
161| *The Copilot Workspace dashboard showing recent, bookmarked and completed sessions*
162| 
163| Undo and redo are supported within the session via buttons on the toolbar.
164| 
165| ## Joint Marketing and Distribution
166| 
167| ### Co-Marketing Opportunities
168| 
169| 1. **Webinars and Workshops**:
170|    - Host live webinars showcasing "Copilot Workspace" integrations with partner tools.
171|    - Record sessions for on-demand viewing.
172| 2. **Shared Content Creation**:
173|    - Collaborate with partners to create blog posts, tutorials, and case studies.
174| 3. **Social Media Campaigns**:
175|    - Promote collaborative content across social platforms like GitHub, LinkedIn, and Twitter.
176| 
177| ### Distribution Strategies
178| 
179| 1. **Marketplace Listings**:
180|    - Publish "Copilot Workspace" on GitHub Marketplace with detailed descriptions and pricing.
181|    - Explore integration with Microsoft Teams App Store and other SaaS directories.
182| 2. **Affiliate Program**:
183|    - Allow influencers and partners to earn commissions by referring users.
184| 3. **Product Bundles**:
185|    - Partner with complementary tools (e.g., task managers, CI/CD platforms) to offer bundled pricing.
186| 
187| ### Metrics and Feedback
188| 
189| - Track user engagement and conversion rates from joint campaigns.
190| - Use feedback to refine co-marketing strategies.
191| 
192| ## Appendix: Glossary
193| 
194| | Term | Definition |
195| |------|------------|
196| | Copilot Workspace | A Copilot-native dev environment that’s designed for exploring and completing every day tasks  |
197| | Target | A branch of a codebase at a specific commit | 
198| | Task | A natural language description of a change to a target | 
199| | Topic | A brief single-sentence summary of a task, usually in question form |
200| | Specification | A description of the current and proposed state of the target as it relates to the task |
201| | Plan | A list of files to add, remove or change, with notes about each of them, that together transform the target from its current state to its proposed state |
202| | Implementation | A set of changes to the target that, when applied, will complete the task |
203| | Session | A user’s saved progress towards completing a task, a single task can have many sessions |
204| | Snapshot session | A snapshot of a user’s session, created when you click “Share link”, including both the task progress and UX state |