import AddTodoButton from "@/components/todo-creation/add-todo-button/AddTodoButton";
import { Box } from "@/components/ui/box";
import { Pressable } from "react-native";
import { CalendarDaysIcon, DownloadIcon, Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";

export default function Index() {
    return (
        <>
            <Box className="flex-row p-4 gap-4">
                <Link
                    href={"/today"}
                    asChild
                >
                    <Pressable className="flex-1">
                        <Card className="max-w-[200px]">
                            <Icon as={CalendarDaysIcon} />
                            <Heading className="my-2">Today</Heading>
                        </Card>
                    </Pressable>
                </Link>
                <Link
                    href="/backlog"
                    asChild
                >
                    <Pressable className="flex-1">
                        <Card className="max-w-[200px]">
                            <Icon as={DownloadIcon} />
                            <Heading className="my-2">Backlog</Heading>
                        </Card>
                    </Pressable>
                </Link>
            </Box>
            <AddTodoButton />
        </>
    );
}
