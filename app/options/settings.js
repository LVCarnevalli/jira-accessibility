window.addEvent("domready", function () {
    // Option 1: Use the manifest:
    // new FancySettings.initWithManifest(function (settings) {
    //     settings.manifest.myButton.addEvent("action", function () {
    //         alert("You clicked me!");
    //     });
    // });
    
    // Option 2: Do everything manually:
    var settings = new FancySettings("JIRA Accessibility", "icon.png");
    
    var url = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("jira"),
        "name": "url",
        "type": "text",
        "label": i18n.get("username")
    });
    
    var project = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("jira"),
        "name": "project",
        "type": "text",
        "label": i18n.get("password")
    });
    
    var description = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("jira"),
        "name": "myDescription",
        "type": "description",
        "text": i18n.get("description")
    });
    
    settings.align([
        url,
        project
    ]);
});
