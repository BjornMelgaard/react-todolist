export default [
  {
    id:    1,
    name:  "project1",
    tasks: [
      {
        id:       1,
        name:     "task1",
        done:     null,
        deadline: null,
        position: 3,
        comments: [
          {
            id:          1,
            text:        "comment1",
            attachments: [
              {
                id:   1,
                file: {
                  url:  "file1",
                  name: "file1",
                  size: null,
                },
              },
              {
                id:   2,
                file: {
                  url:  "file2",
                  name: "file2",
                  size: null,
                },
              },
            ],
          },
          {
            id:          2,
            name:        "comment2",
            attachments: [],
          },

        ],
      },
      {
        id:       2,
        name:     "task2",
        done:     null,
        deadline: null,
        position: 1,
        comments: [],
      },
      {
        id:       3,
        name:     "task3",
        done:     null,
        deadline: null,
        position: 2,
        comments: [],
      },
    ],
  },
  {
    id:    2,
    name:  "project2",
    tasks: [
      {
        id:       5,
        name:     "task4",
        done:     null,
        deadline: null,
        position: 1,
        comments: [],
      },
    ],
  },
  {
    id:    3,
    name:  "project3",
    tasks: [],
  },
]
