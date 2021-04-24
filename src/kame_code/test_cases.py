from abc import abstractmethod, ABCMeta
from typing import Any, List
from kame_code.game import Game, Tile


class ITestCase(metaclass=ABCMeta):
    @abstractmethod
    def is_passing(self):
        pass


class TestCase():
    def __init__(self, name: str, desc: str, game: Game):
        self.name = name
        self.desc = desc
        self.game = game


class LevelTestCase(ITestCase):
    def __init__(self, test_case: TestCase, expected_level: List[List[Tile]]):
        self.test_case = test_case
        self.expected_level = expected_level

    def is_passing(self):
        return self.test_case.game.level == expected_level


class OutputTestCase(ITestCase):
    def __init__(self, test_case: TestCase, expected_output: Any):
        self.test_case = test_case
        self.expected_output = expected_output

    def is_passing(self):
        return self.test_case.game.output == expected_output


class FlagTestCase(ITestCase):
    def __init__(self, test_case: TestCase):
        self.test_case = test_case

    def is_passing(self):
        return len(self.test_case.game.flags) == 0
