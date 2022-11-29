import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function action() {
  await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div>
        <h1>React Router Contacts</h1>
        <div>
          <form role="search">
            <input placeholder="Search" type="search" />
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
