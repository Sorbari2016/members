# Members only

## Description:

Members only is a simple web application for a fictitious clubhouse, where members can write anonymous posts. The guildelines of the project is designed to help me understand and know to implement:

- Role-Based Access Control (RBAC) feature.
- Validation & Sanitation of form data.
- Database integration, &
- Authentication of node js app.

## Features:

- Guests can sign up or log in. They see all messages, but author names and dates are hidden.
- Logged-in users (non-members) see messages the same way as guests. They can write new messages, edit their own messages, and click **Become a Member** to join.
- Members can view complete message details, including the author and creation date. They can also create new messages and edit their own.
- Admins have full member privileges, plus the ability to delete any message or promote other members to admins.

## Tech Stack:

- Node JS + Express JS
- EJS
- CSS
- Postgres

  ## App Homepage

  ### Guest

  ![Guest Homepage](https://github.com/Sorbari2016/members/blob/main/public/images/anonymous-home.png)

  ### Logged in User (Non-member)

  ![Logged in User, Not a member](https://github.com/Sorbari2016/members/blob/main/public/images/non-member-home.png)

  ### Member

  ![Member](https://github.com/Sorbari2016/members/blob/main/public/images/member-home.png)

  ### Admin

  ![Admin](https://github.com/Sorbari2016/members/blob/main/public/images/admin-home.png)

  ## Future Refactor/Improvement
  - Reorganize app routes, make them uniform.
  - Source for better sounds for checkbox and delete message interactions.
  - Implement Forget password and Change password logic
