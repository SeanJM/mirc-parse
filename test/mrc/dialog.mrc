dialog test {
  title "mIRC"
  size -1 -1 110 100
  option dbu

  menu "&File", 60
    item "&New", 70

  menu "&Load", 80, 60
    item "&Script", 90
    item break, 100
    item "&Users", 110
    item "&Variables", 120

    item "&Unload", 130, 60

    item break, 140

    item "&Save", 150
    item "&Save As...", 160
    item "Save &All", 170

    item break, 180

    item "Save && &exit", 190, ok
    item "&Cancel", 200, cancel
}