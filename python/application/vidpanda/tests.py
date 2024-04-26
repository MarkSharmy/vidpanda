import re



# Example usage
link = "https://www.youtube.com/playlist?list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2" # Replace with your own link

link_type = is_youtube_link(link)
print(f"The link is a YouTube {link_type}.")