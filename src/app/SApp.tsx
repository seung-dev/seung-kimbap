import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { ErrorComponent, RefineSnackbarProvider, ThemedLayoutV2, ThemedTitleV2, notificationProvider } from "@refinedev/mui";
import routerBindings, { CatchAllNavigate, DocumentTitleHandler, NavigateToResource } from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import { authProvider } from "@/authProvider";
import { AppIcon } from "@/components/app-icon";
import { Header } from "@/components/header";
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from "@/pages/blog-posts";
import { ForgotPassword } from "@/pages/forgotPassword";
import { Login } from "@/pages/login";
import { Register } from "@/pages/register";

import { SDefaultV, SThemeV } from "@app/layout";

function SApp() {
	const { t, i18n } = useTranslation();

	const i18nProvider = {
		translate: (key: string, params: object) => t(key, params),
		changeLocale: (lang: string) => i18n.changeLanguage(lang),
		getLocale: () => i18n.language,
	};

	return (
		<BrowserRouter>
			<RefineKbarProvider>
				<SDefaultV>
					<SThemeV>
						<CssBaseline />
						<GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
						<RefineSnackbarProvider>
							<DevtoolsProvider>
								<Refine
									dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
									notificationProvider={notificationProvider}
									authProvider={authProvider}
									i18nProvider={i18nProvider}
									routerProvider={routerBindings}
									resources={[
										{
											name: "blog_posts",
											list: "/blog-posts",
											create: "/blog-posts/create",
											edit: "/blog-posts/edit/:id",
											show: "/blog-posts/show/:id",
											meta: {
												canDelete: true,
											},
										},
									]}
									options={{
										syncWithLocation: true,
										warnWhenUnsavedChanges: true,
										useNewQueryKeys: true,
										projectId: "lx66W1-tti9qF-8830Nb",
									}}
								>
									<DocumentTitleHandler />
									<RefineKbar />
									<Routes>
										<Route
											element={
												<Authenticated
													key="authenticated-inner"
													fallback={<CatchAllNavigate to="/login" />}
												>
													<ThemedLayoutV2
														Header={() => <Header sticky />}
														Title={({ collapsed }) => (
															<ThemedTitleV2
																collapsed={collapsed}
																text="refine Project"
																icon={<AppIcon />}
															/>
														)}
													>
														<Outlet />
													</ThemedLayoutV2>
												</Authenticated>
											}
										>
											<Route index element={<NavigateToResource resource="blog_posts" />} />
											<Route path="/blog-posts">
												<Route index element={<BlogPostList />} />
												<Route path="create" element={<BlogPostCreate />} />
												<Route path="edit/:id" element={<BlogPostEdit />} />
												<Route path="show/:id" element={<BlogPostShow />} />
											</Route>
											<Route path="*" element={<ErrorComponent />} />
										</Route>
										<Route
											element={
												<Authenticated key="authenticated-outer" fallback={<Outlet />}>
													<NavigateToResource />
												</Authenticated>
											}
										>
											<Route path="/login" element={<Login />} />
											<Route path="/register" element={<Register />} />
											<Route path="/forgot-password" element={<ForgotPassword />} />
										</Route>
									</Routes>
								</Refine>
							</DevtoolsProvider>
						</RefineSnackbarProvider>
					</SThemeV>
				</SDefaultV>
			</RefineKbarProvider>
		</BrowserRouter>
	);
}

export default SApp;
