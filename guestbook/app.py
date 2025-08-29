from flask import Flask, render_template, request, redirect, url_for, flash
import json
import os
from datetime import datetime
import markdown

app = Flask(__name__)
app.secret_key = "changeme-secret"  # Needed for flashing error messages

GUESTBOOK_FILE = "guestbook.json"

def load_messages():
    """Load messages from the JSON file."""
    if not os.path.exists(GUESTBOOK_FILE):
        return []
    with open(GUESTBOOK_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_messages(messages):
    """Save the list of messages to the JSON file."""
    with open(GUESTBOOK_FILE, "w", encoding="utf-8") as f:
        json.dump(messages, f, indent=4)
























# ===========================
# BLOG ROUTES
# ===========================

BLOG_FILE = "blog.json"

def load_blog():
    if not os.path.exists(BLOG_FILE):
        return []
    with open(BLOG_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_blog(posts):
    with open(BLOG_FILE, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=4)

@app.route("/blog")
def blog():
    posts = load_blog()
    # Sort latest first
    posts = sorted(posts, key=lambda x: x["date"], reverse=True)
    return render_template("blog.html", posts=posts)

# Example: admin route to add posts manually (you can later replace with CMS/form)
@app.route("/add_post", methods=["POST"])
def add_post():
    title = request.form.get("title", "").strip()
    content = request.form.get("content", "").strip()

    if title and content:
        posts = load_blog()
        posts.append({
            "title": title,
            "content": markdown.markdown(content, extensions=["extra", "sane_lists", "nl2br"]),
            "date": datetime.now().strftime("%d")  # store just the day for now
        })
        save_blog(posts)

    return redirect(url_for("blog"))




























@app.route("/guestbook", methods=["GET", "POST"])
def guestbook():
    if request.method == "POST":
        # Get form inputs
        name = request.form.get("name", "").strip()
        contact = request.form.get("contact", "").strip()
        message = request.form.get("message", "").strip()
        botcheck = request.form.get("botcheck", "").strip()

        # Handle defaults
        if not name:
            name = "Someone"

        # Bot prevention: must type "guestbook"
        if botcheck.lower() != "guestbook":
            flash("Are you...a robot? You might like this [rick astley link]")

            # Re-render the template with previous input preserved
            messages = load_messages()
            return render_template(
                "guestbook.html",
                messages=messages,
                prev_name=name,
                prev_contact=contact,
                prev_message=message,
                prev_botcheck=botcheck
            )


        # Only save if message is not empty
        if message:
            messages = load_messages()

            # Render markdown safely (strip dangerous HTML)
            rendered_message = markdown.markdown(message, extensions=["extra", "sane_lists", "nl2br"])

            # Add new entry
            messages.append({
                "name": name,
                "contact": contact,
                "message": rendered_message,
                "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            save_messages(messages)

        return redirect(url_for("guestbook"))

    messages = load_messages()
    return render_template("guestbook.html", messages=messages)




@app.route("/") #SINGLE SLASH MEANS ROOT 
def mainpage():
    return render_template("mainpage.html")






if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
