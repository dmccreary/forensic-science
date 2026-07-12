# Generate Student Investigation Cover Images

!!! prompt
    Our teachers are very excited to try out the new student investigations located in [student-investigations](docs/student-investigations/) - the structure is each student investigation is it's own directory with the index.md file in the directory holding the steps to the investigation.  We have a very boring list of the student investigations at [index.md](docs/student-investigations/index.md) but that page is just a boring list of title and descriptions.  What your task is this:
    Create an interesting "Cover Page" for each student investigation project.
    Create a detailed description (image prompt for a text-llm model) of the cover page with the title and a relevant image of the project.  Remember these are students in the 9-12th grade so they might be featured in the cover image doing the lab.  Create a montage of key parts of the project in the background of the cover image description.
    After you generate a detailed cover image description put in in a cover-image-prompt.md file in each projects directory, then generate the image. Put the image in the file cover.png in the project directory.
    Then update the index.md so the summary shows the cover image.
    Then make sure that the main index.md file for each project includes the cover.png at the top of the index.md as a markdown image reference ![Cover Image](./cover.png)
    After you have stored the images, publish them (git commit, git push and mkdocs gh-deploy).

    Give me detailed feedback as you progress. Do git commits and push after each student investigation prompt has been generated.