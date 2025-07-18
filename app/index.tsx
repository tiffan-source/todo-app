import AddTodoButton from "@/components/create-todo/add-todo-button/AddTodoButton";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { CalendarDaysIcon, DownloadIcon, Icon } from "@/components/ui/icon";
import { Link } from "expo-router";
import { Pressable } from "react-native";

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
