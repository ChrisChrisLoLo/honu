from setuptools import setup, find_packages

# Metadata goes in setup.cfg. These are here for GitHub's dependency graph.
# Also used to specify package_data
setup(
    name="Honu",
    install_requires=[
        "graphics.py>=5.0.1.post1",
    ],
    extras_require={
    },
    package_data={
        # Used to include the default levels
        "": ["*.json"],
    }
)