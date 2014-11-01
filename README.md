technion-moodle-connector
=========================

Technion Moodle Connector is a simple extension that enables the automation of the login process to moodle.technion.ac.il from any Firefox browser. It was built by Daniel Mittelman, a student at the CS faculty in the Technion, using Mozilla's new Addon SDK (a.k.a Jetpack), and hence built using only HTML, JavaScript and CSS3.


Usage
-----

Immediately after installation, a new icon should appear in Firefox's toolbar, to the right of the
search bar, in the shape of a blue Moodle icon. To begin using the addon, click the button to set up your account details and check the "Enable Technion Moodle Connector". Restarting the browser is not required.


Code structure
--------------

The source files are located in their default directories, as per Mozilla's specifications:
* lib - Stores the addon's code in the main.js file
* data - Contains all the additional resources, such as injected scripts, images and external HTML and CSS files
* test - Contains a default empty test file


Building from source
--------------------

To build the addon, first download the prerequisites by following the instructions [here](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).

After you've acquired the Addon SDK, Python 2.7 and a Firefox browser, and are able to run basic commands using the cfx executable, download the source code to a local directory on your computer.

Then, run:

    cfx xpi
    
Open the generated .xpi file in Firefox and install.


Contributing
----------

This addon is available for free use, and you're more than welcome to clone or fork this repository for your own needs. If you think you can contribute to the development of the addon, don't hesitate to send a pull request with your code modifications! Keep in mind that you may not, however, remove or replace the credits for the author of the addon or add your own without prior consent.
