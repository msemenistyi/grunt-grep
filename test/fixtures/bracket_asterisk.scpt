tell application "Finder"
    if folder "Applications" of startup disk exists then (* @grep ios *)
        return count files in folder "Applications" of startup disk (* @grep android *)
    else (* @grep ios:s *)
        return 0
    end if (* @grep ios:e *)
end tell